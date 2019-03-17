import React, { useReducer, useEffect } from 'react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Loading } from '../../components/loading';
import Result from './result';
import {
    HeadWrapper,
    Main,
    Title,
    Text,
    Wrapper,
    UserNameInput,
    SpinnerWrapper,
    UsernameWrapper,
    Image,
} from './ensouled-heads.styled';
import ensouledHeads from './head-data';

const { ipcRenderer } = window.require('electron');

const heads = Object.keys(ensouledHeads).reduce((acc, head) => {
    acc[head] = '';
    return acc;
}, {});

const initialState = {
    stats: {
        magic: { level: 1, xp: 0 },
        prayer: { level: 1, xp: 0 },
    },
    username: '',
    usernameError: '',
    loading: true,
    loadingMessage: 'Getting rune prices...',
    calculate: true,
    heads,
    loadingWasChanged: false,
    prayerExpGained: 0,
    magicExpGained: 0,
    prices: undefined,
    costs: {
        bloodRune: 0,
        soulRune: 0,
        natureRune: 0,
        bodyRune: 0,
    },
    runes: {
        blood: 0,
        soul: 0,
        nature: 0,
        body: 0,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME': {
            return { ...state, username: action.username };
        }
        case 'SET_HEAD': {
            const { head, value } = action;
            const { prayerExpGained, magicExpGained, runes } = state;

            const oldValue = state.heads[head];

            const { prayExp, magicExp, bodyRune, soulRune, natureRune, bloodRune } = ensouledHeads[head];

            const newHeadCount = value - oldValue;

            const bloodRuneCount = runes.blood + newHeadCount * bloodRune;
            const natureRuneCount = runes.nature + newHeadCount * natureRune;
            const soulRuneCount = runes.soul + newHeadCount * soulRune;
            const bodyRuneCount = runes.body + newHeadCount * bodyRune;

            return {
                ...state,
                heads: { ...state.heads, [head]: value },
                runes: {
                    nature: natureRuneCount,
                    body: bodyRuneCount,
                    soul: soulRuneCount,
                    blood: bloodRuneCount,
                },
                prayerExpGained: prayerExpGained + newHeadCount * prayExp,
                magicExpGained: magicExpGained + newHeadCount * magicExp,
            };
        }
        case 'SET_STATS': {
            const { stats } = action;

            return { ...state, stats, calculated: true };
        }
        case 'SET_PRICES': {
            const { prices } = action;
            return { ...state, prices };
        }
        case 'SET_USERNAME_ERROR': {
            const { errorMessage } = action;

            return {
                ...state,
                usernameError: errorMessage,
                calculated: false,
                stats: initialState.stats,
            };
        }
        case 'LOADING_START': {
            const { loadingMessage } = action;
            return {
                ...state,
                loading: true,
                usernameError: '',
                loadingWasChanged: true,
                loadingMessage,
            };
        }
        case 'LOADING_END': {
            return {
                ...state,
                loading: false,
                loadingMessage: '',
            };
        }
        default:
            /* istanbul ignore next */
            return state;
    }
};

const calculate = ({ dispatch, username }) => () => {
    ipcRenderer.send('get-user-stats', username);

    dispatch({
        type: 'LOADING_START',
        loadingMessage: 'Getting your stats...',
    });

    ipcRenderer.once('user-stats', (_, err, stats) => {
        if (!err) {
            dispatch({ type: 'SET_STATS', stats });
        } else {
            dispatch({
                type: 'SET_USERNAME_ERROR',
                errorMessage: 'An error occured. Please verify your username.',
            });
        }
        dispatch({ type: 'LOADING_END' });
    });
};

const EnsouledHeads = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        username,
        usernameError,
        heads,
        loading,
        calculated,
        stats,
        prayerExpGained,
        magicExpGained,
        prices,
        costs,
        runes,
        loadingMessage,
    } = state;

    useEffect(() => {
        if (!prices) {
            ipcRenderer.send('get-rune-prices');
            ipcRenderer.once('rune-prices', (_, prices) => {
                dispatch({ type: 'SET_PRICES', prices });
                dispatch({ type: 'LOADING_END' });
            });
        }
    });

    return (
        <>
            <Main>
                {
                    <SpinnerWrapper loading={loading}>
                        <Loading />
                        <p>{loadingMessage}</p>
                    </SpinnerWrapper>
                }
                <Title>Ensouled head calculator</Title>
                <Text>
                    Enter your in game name and how many ensouled heads you have to discover how much exp and how what
                    level you will end up. You must provide your username to calculate your exp gains.
                </Text>
                <UsernameWrapper>
                    <UserNameInput
                        value={username}
                        onChange={username =>
                            dispatch({
                                type: 'SET_USERNAME',
                                username,
                            })
                        }
                        label="Username"
                        error={usernameError}
                    />
                    <Button
                        label="Get Stats"
                        onClick={calculate({
                            dispatch,
                            username,
                        })}
                    />
                </UsernameWrapper>
                <Wrapper>
                    {Object.keys(heads).map(head => {
                        return (
                            <HeadWrapper key={`ensouled-${head}`}>
                                <Image title={`${head} head`} alt={`${head} image`} src={ensouledHeads[head].src} />
                                <Input
                                    type="number"
                                    min={0}
                                    name={`${head}-amount`}
                                    value={heads[head]}
                                    onChange={value =>
                                        dispatch({
                                            type: 'SET_HEAD',
                                            head,
                                            value,
                                        })
                                    }
                                />
                            </HeadWrapper>
                        );
                    })}
                </Wrapper>
                {calculated && (
                    <Result
                        prayerExpGained={prayerExpGained}
                        magicExpGained={magicExpGained}
                        stats={stats}
                        runes={runes}
                        prices={prices}
                    />
                )}
            </Main>
        </>
    );
};

export default EnsouledHeads;
