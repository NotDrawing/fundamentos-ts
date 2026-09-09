import type { Gif } from "../models/gif.interface";

export function createGifCard(gif: Gif): string {
    const {
        title,
        url,
        description = 'Sin descripción',
        username = 'Autor no disponible',
        tags,
        rating,
    } = gif;
    return `
    <article class="gif-card">
      <img src="${url}" alt="${title}"
        loading="lazy" />
      <div class="gif-card__content">
        <h2>${title}</h2>
        <p>Descripción: ${description}</p>
        <p>${username} - Clasificación
          ${rating.toUpperCase()}</p>
        <p class="tags">
          ${tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      </div>
    </article>
  `;
}

export function renderGallery(
    collection: Gif[],
    container: HTMLElement,
): void {
    container.innerHTML = collection.map(createGifCard).join('');
} 