import styled from 'styled-components';

import Colors from '../../utils/styles/colors';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Tile = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    margin: 5px;
    flex-direction: column;
    justify-content: flex-start;
    border: solid 1px ${Colors.grey.light};
    &:hover {
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }
`;

export const TileTitleContainer = styled.div`
    box-sizing: border-box;
    padding: 4px;
    height: 80px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: solid 1px ${Colors.grey.light};
`;

export const TileDescription = styled.div`
    flex-grow: 1;
    box-sizing: border-box;
    padding: 14px;
    font-size: 16px;
    display: flex;
    line-height: 1.75;
`;
export const TileActions = styled.div`
    border-top: solid 1px ${Colors.grey.light};
    height: 60px;
`;

export const TileAction = styled.div`
    flex-grow: 1;
`;
export const TileTitle = styled.h2`
    margin: 0;
`;
