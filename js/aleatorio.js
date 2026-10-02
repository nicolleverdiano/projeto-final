const nomes = ["Fernanda", "Gabriel", "Juliana", "Lucas", "Beatriz"];

export function geraNomeAleatorio() {
    const posicao = Math.floor(Math.random() * nomes.length);
    return nomes[posicao];
}

export function buscaItemAleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}