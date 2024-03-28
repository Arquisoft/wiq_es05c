import React from 'react';
import {GameBlock} from './GameBlock';

export function AllGamesBlock({ games }){


    return (
        <div>
            {games.map((game) => (
                <GameBlock key={game.id} game={game} />
            ))}
        </div>
    );
};