import type { Gif } from "../models/gif.interface";

const MEDIA_URL = 'https://media.giphy.com/media';

export const gifs: Gif[] = [
    {
        id: 'cat-01',
        title: 'Gato programadno',
        description: 'Un gato que esta tecleando en una laptop',
        url: `${MEDIA_URL}/JIX9t2j0ZTN9S/giphy.gif`,
        username: 'gifinder',
        tags: ['gato', 'programación', 'computadora'],
        rating: 'g',
    },
    {
        id: 'celebration-01',
        title: 'Celebración del equipo',
        description: 'Leonardo di caprio levantando una copa',
        url: `${MEDIA_URL}/g9582DNuQppxC/giphy.gif`,
        tags: ['equipo', 'éxito', 'celebración'],
        rating: 'g',
    },
    {
        id: 'coding-01',
        title: 'Código en progreso',
        url: `${MEDIA_URL}/13HgwGsXF0aiGY/giphy.gif`,
        username: 'developer',
        tags: ['código', 'desarrollo', 'teclado'],
        rating: 'pg',
    },
    {
        id: 'idea-01',
        title: 'Nueva idea',
        url: `${MEDIA_URL}/l0HlRnAWXxn0MhKLK/giphy.gif`,
        tags: ['idea', 'creatividad', 'solución'],
        rating: 'g',
    },
    {
        id: 'dog-01',
        title: 'Perro feliz',
        description: 'Un perro moviendo la cola emocionado',
        url: `${MEDIA_URL}/hSL5u2QBjfgXuR99lE/giphy.gif`,
        username: 'petlover',
        tags: ['perro', 'alegría', 'mascota'],
        rating: 'g',
    },
    {
        id: 'travel-01',
        title: 'Viaje soñado',
        description: 'Torre eiffel',
        url: `${MEDIA_URL}/av1MVnL2LSDpm/giphy.gif`,
        tags: ['viaje', 'playa', 'atardecer'],
        rating: 'pg',
    },
];