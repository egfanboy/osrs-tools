import styled, { css, keyframes } from 'styled-components';
import { Input } from '../../components/input';
import { WikiImage } from '../../components/wiki-image';

export const Title = styled.h2`
    font-size: 26px;
`;

const loadingFade = keyframes`
    from{
        opacity: 0.9;
    }
    to {
        opacity: 0;
        visibility: hidden;
    }
`;

const fadeCss = css`
    animation: ${loadingFade} 0.5s ease-out forwards;
`;

export const Hint = styled.p``;

export const UserNameInput = styled(Input)`
    width: 300px;
`;

export const UsernameWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 6px;
`;

export const SpinnerWrapper = styled.div`
    position: absolute;

    width: 95%;
    height: 95%;
    z-index: 1;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 0.9;
    ${({ loading }) => !loading && fadeCss};
`;

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Image = styled(WikiImage)`
    margin: 6px;
`;

export const HeadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15%;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const ExpGained = styled.div`
    display: flex;
`;

export const SkillIcon = styled(WikiImage)`
    width: 24px;
    height: 24px;
    margin: 0 6px;
`;

export const GPIcon = styled(WikiImage)`
    width: 24px;
    height: 24px;
    margin: 0 6px;
`;

export const Text = styled.p`
    font-size: 18px;
    margin: 0;
    white-space: pre-line;
`;

export const LevelsGained = styled.p`
    font-size: 14px;
    margin: 0;
`;

export const ResultMain = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;
