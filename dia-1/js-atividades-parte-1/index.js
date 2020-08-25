/**
 * Hiroki é japonês, e ao visitar o Brasil, viu beleza em nosso idioma, e se apaixonou.
 * Desde então está tentando aprendê-lo. Enquanto Hiroki lia alguns poemas antigos, idenfificou
 * algumas palavras em que está tendo dificuldades para lembrar o significado, e criou um dicionário.
 * Para ser mais rápido pediu a sua ajuda para mostra-lo o significado dessas palavras, e quais dos 
 * poemas é mais difícil.
 * 
 * Escreva uma função que receba um texto, e para cada palavra desse texto presente no dicionário de 
 * Hiroki, mostre no log a palavra e seu significado. Essa função deve retornar a quantidade de
 * palavras difíceis para Hiroki no texto. Mostre essa quantidade para cada texto, e ao fim, 
 * decida qual dos textos é mais difícil considerando essa quantidade.
 *
 * Referência de alguns métodos de objetos do Javascript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects
 */


const dicionarioDeHiroki = {
    'inculta': 'Ser desprovido de cultura',
    'singela': 'Elemento simples, sem adorno, comum',
    'trom': 'Arma como uma catapulta \n(2) grande estrondo',
    'silvo': 'Som agudo, assobio',
    'arrolo': 'Canto de ninar',
    'ternura': 'Afeto, meiguice',
    'viço': 'Aspecto jovem \n(2) Carinho excessivo',
    'ventura': 'Boa sorte, destino favorável',
    'pálio': 'capa, manto',
    'inda': 'mesmo que "ainda", até esse instante',
    'tresloucado': 'pessoa sem juizo, desvairado'
}

// Título do texto: lingua Portuguesa
const linguaPortuguesa = `
    Última flor do Lácio, inculta e bela,
    És, a um tempo, esplendor e sepultura:
    Ouro nativo, que na ganga impura
    A bruta mina entre os cascalhos vela
    Amo-te assim, desconhecida e obscura
    Tuba de algo clangor, lira singela,
    Que tens o trom e o silvo da procela,
    E o arrolo da saudade e da ternura!
    Amo o teu viço agreste e o teu aroma
    De virgens selvas e de oceano largo!
    Amo-te, ó rude e doloroso idioma,
    Em que da voz materna ouvi: “meu filho!”,
    E em que Camões chorou, no exílio amargo,
    O gênio sem ventura e o amor sem brilho
`
// Título do texto: Ouvir Estrelas
const ouvirEstrelas = `
    "Ora (direis) ouvir estrelas! Certo
    Perdeste o senso!" E eu vos direi, no entanto,
    Que, para ouvi-las, muita vez desperto
    E abro as janelas, pálido de espanto...

    E conversamos toda a noite, enquanto
    A via-láctea, como um pálio aberto,
    Cintila. E, ao vir do sol, saudoso e em pranto,
    Inda as procuro pelo céu deserto.

    Direis agora: "Tresloucado amigo!
    Que conversas com elas? Que sentido
    Tem o que dizem, quando estão contigo?"

    E eu vos direi: "Amai para entendê-las!
    Pois só quem ama pode ter ouvido
    Capaz de ouvir e de entender estrelas."
`
// Solução possível
function contarPalavrasDificeis(texto) {
    let numPalavrasDificeis = 0

    for (let palavra of texto.split(' ')) {
        // REFACTOR: Utilizar regex para simplificar a palavra e testar presença no
        // dicinário.
        for (let palavraDificil in dicionarioDeHiroki) {
            if (palavra.toLowerCase().includes(palavraDificil)) {
                console.log(palavraDificil + ': ' + dicionarioDeHiroki[palavraDificil])
                numPalavrasDificeis++
            }
        }
    }

    return numPalavrasDificeis
}

const numPalavrasDificeisLinguaPortuguesa = contarPalavrasDificeis(linguaPortuguesa)
console.log('O texto Lingua Portuguesa contem ' + numPalavrasDificeisLinguaPortuguesa + ' dificeis')
const numPalavrasDificeisOuvirEstrelas = contarPalavrasDificeis(ouvirEstrelas)
console.log('O texto Ouvir Estrelas contem ' + numPalavrasDificeisOuvirEstrelas + ' dificeis')