import React from 'react';

export function Ranking({darkMode}){
    // Aquí puedes agregar la lógica para obtener los datos del ranking de usuarios
    const users = [
        { name: 'Usuario 1', dailyQuestions: 10 },
        { name: 'Usuario 2', dailyQuestions: 8 },
        { name: 'Usuario 3', dailyQuestions: 5 },
        // Agrega más usuarios según sea necesario
    ];

    // Ordenar los usuarios por número de preguntas diarias acertadas
    users.sort((a, b) => b.dailyQuestions - a.dailyQuestions);

    return (
        <div>
            <h1>Ranking de Usuarios</h1>
            <ol>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name} - {user.dailyQuestions} preguntas acertadas
                    </li>
                ))}
            </ol>
        </div>
    );
}