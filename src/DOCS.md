# Boas vindas ao repositório do projeto TrybeTunes!

Este arquivo contempla a explicacao sobre cada requisito do projeto, foi a forma que encontrei para consolidar a logica utilizada para desenvolver cada requisito.

É o primeiro projeto que formulo os comentarios desta forma.

Vamos lá!

## 1. Crie as rotas necessárias para a aplicação

Requisito contemplado no arquivo 'App.js', foram criadas rotas para as pages: Login, Search, Album, Favorites, Profile, ProfileEdit e Not Found --> (em caso de qualquer outra rota nao mapeada).

Import do React, dos componentes: BrowserRouter, Route e Switch do react-router-dom e das pages que serao utilizadas nas rotas. 

<--------------------------------------------------------------------------------------------------->

Dentro do render do componente de classe App.js foi criado uma section(para contemplar HTML semantico) onde contem: 
- BrowserRouter --> componente responsável por fazer o roteamento dos nossos componentes, esta encapsulando todas as rotas; 
- o Switch --> compara a Route e iterará sobre todos os seus elementos e renderizará o primeiro que corresponda ao local atual;
- Route --> componente responsável por determinada a rota do sistema.

Foi usado exact para que o caminho da rota fosse renderizado se exatamente igual ao determinado no path do Route(em suma o Switch ja teria essa funcao, mas resolvi usar o exact mesmo assim).

Cada componente de rota possui uma div que contem um atributo com data-testid correspondente ao seu nome "page", para fins de teste.

## 2. Crie um formulário para identificação

Requisito contemplado no arquivo "Login" na pasta "pages". Nele devera conter um campo de input do tipo texto e um botao de salvar.

O arquivo comeca com todos os imports necessarios.

No render foi criado um form onde o InputText(component) e o button recebem as propriedades necessarias para sua montagem. InputText possui um label vinculada a ele. 

Os elementos renderizados recebem o data-testid para fins de teste.

Dentre as condicoes do requisito está: habilitar o botao de salvar se digitados, no campo input, no minimo 3 caracteres.

Para isso, dentre as propriedades do input ele recebe onChange que tem a funcao handleChangeLogin como valor. E o button recebe onClick que tem a funcao handleClickSave() como valor.

A página devera ser redirecionada para a rota "/search" logo que createUser finalizar sua execucao.

<--------------------------------------------------------------------------------------------------->

Para salvar o nome do usuario sera usada a funcao createUser({name}) recebendo um objeto com os dados digitados pela pessoa, que no momento sera usado somente o nome. Trata-se de uma funcao assincrona e por isso deve aparecer o texto "Carregando..." enquanto a funcao não retornar seu resultado.

Como precisamos salvar o nome digitado e usei seu length para habilitar o botao de salvar, usarei a funcao handleChangeLogin(event) para capturar as informacoes e criar a condicao.

No state criei:
--> Controle habilitacao do botao: o state "isDisabled" que inicia com true, foi atribuido ao atributo disabled do botao, para que inicie desabilitado, pois este atributo aceita somente true ou false como valor.
--> Controle para "Carregando..." na pagina: o state "isLoading" que inicia como false.
--> Parametro para createUser: state "nameLogin" que armazenara o nome digitado no input(value) e sera atribuído como parametro na funcao createUser.
--> Controle de recidrecionamento da página: o state "redirect" que inicia com false.

Na funcao handleChangeLogin(event): desestruturei o target do event, e dele, as propriedades name e value, onde:
--> name refere-se ao atributo name do campo(neste caso também é nameLogin);
--> value o que esta sendo digitado no mesmo.
Seto novo estado com setState sendo que a chave [name] do campo, que neste caso setara nameLogin, recebe como novo estado o value digitado.
Seto também para a propriedade "isDisabled" recebera o resultado da condicao de --> value.length < MIN_LENGTH (é 3) <--, sendo assim se for true o botao permanece desabilitado e se for false ele sera habilitado. 
Essa condicao permite que ao inserir ou apagar caracteres a condicao altere o estado do botao.

Com o botao desabilitado, vamos salvar as informações usando a funcao handleClickSave. Esta, recebe a propriedade nameLogin(que foi renomeada para name) do this.state e seta o novo estado usando a sintaxe do setState recebendo um objeto como primeiro argumento e um callback como segundo.
O primeiro seta o estado de "isLoading" para true, a callBack chamara a funcao createUser({name}), após seu retorno setará "isLoading" para false e "redirect" para true.

Ao renderizar a pagina, sao colocadas as seguintes condições:
Se "isLoading" for true(sera enquanto creatUser nao retornar) vai renderizar o componente Loading que apresenta o texto "Carregando..." na tela;
Se "redirect" for true (sera apos a createUser retornar) a pagina sera redirecionada para a rota "/search".


## 3. Crie um componente de cabeçalho
## 4. Crie os links de navegação no cabeçalho

Criar um componente de classe Header que renderiza o nome do usuario criado em todas as rotas contempladas no App.js

O arquivo comeca com todos os imports necessarios.

Ao abrir qualquer page, a Header vai renderizar um link para search, favorites e profile bem como o nome criado na pagina de login.

Usado o componente react-router-dom Link para criar os links. 

Usada a funcao assincrona getUser que resgatara o nome registrado anteriormente.

<--------------------------------------------------------------------------------------------------->

Criei dois states iniciais: "user" que inicia com null, posteriormente recebera o nome salvo, e "isLoading" que inicia com false e so sera true enquanto a getUser nao retornar seu resultado.

A funcao getUser usa seState com a sintaxe ({}, ()=>{}), o primeiro argumento seta "isLoading" para true e o segundo executa de forma assincrona a funcao getUser guardando seu resultado numa constante chamada user, apos retornar o nome salvo, seto novamente o state de "isLoading" para false e o state user recebe a contante user como resultado(como se trata do mesmo nome nao preciso repetir). Ao abrir a pagina, após a renderização(render()) getUser é chamada automaticamente por meio do componentDidMount.

Ao renderizar a pagina, sao colocadas as seguintes condições:
Se "isLoading" for true(sera enquanto getUser nao retornar) vai renderizar o componente Loading que apresenta o texto "Carregando..." na tela, se user estiver null, ou seja, nao retornar nada, a Header nao renderizara nada, somente os links.

## 5. Crie o formulário para pesquisar artistas

## 6. Faça a requisição para pesquisar artistas

Requisito contemplado no arquivo "Search" na pasta "pages". Nele devera conter um campo de input do tipo texto e um botao de pesquisar.

O arquivo comeca com todos os imports necessarios.

Lógica bem semelhante a tela de Login.

No render foi criado um form onde o InputText(component) e o button recebem as propriedades necessarias para sua montagem. InputText possui um label vinculada a ele com o texto "Pesquisar:". 

Os elementos renderizados recebem o data-testid para fins de teste.

Dentre as condicoes do requisito, esta habilitar o botao de Pesquisar se digitados, no campo input, no minimo 2 caracteres.

Para isso, dentre as propriedades do input ele recebe onChange que tem a funcao handleChangeSearch como valor. E o button recebe onClick que tem a funcao handleClickSearch como valor.

Ao clicar no botao pesquisar, o input deve ficar limpo e a funcao searchAlbumAPI(valueInput) deve ser chamada, trazendo os albuns do artista/banda digitados.

<--------------------------------------------------------------------------------------------------->

Como precisamos do nome do artista/banda digitado e tambem seu length para habilitar o botao de pesquisa, usarei a funcao handleChangeSearch(event) para capturar as informacoes e criar a condicao.

No state criei:
--> Controle habilitacao do botao: o state "isDisabled" que inicia com true, e este foi atribuido ao atributo "disabled" do botao, para que inicie desabilitado, pois este atributo aceita somente true ou false como valor.
--> Controle para "Carregando..." na pagina: o state "isLoading" que inicia como false.
--> Parametro para searchAlbumsAPI: state "inputSearch" que armazenara o nome digitado no input(value) e sera atribuida como parametro na funcao.
--> Controle para ocultar o formulario de pesquisa: o state "shouldForm " que inicia com true, ou seja, o formulario ficara visivel enquanto nao clicar em pesquisar.
--> albuns: state que inicia com null, mas que recebera o resultado da pesquisa.
--> searchedArtist: state inicial string vazia, mas recebera o nome do artista(inputSearch) para renderizar na tela de resultados, pois inputSearch tera seus dados apagados posteriormente.
-->Controle de exibicao do resultado da pesquisa: "shouldResultSearch" inicia com false, controlara o state para exibir(ou nao) as informacoes do resultado da pesquisa.

Na funcao handleChangSearch(event): desestruturei o target do event, e dele as propriedades name e value, onde:
--> name refere-se ao atributo name do campo(neste caso é inputSearch);
--> value o que esta sendo digitado no mesmo.
Seto novo estado com setState sendo que a chave [name] do campo, que neste caso setara "inputSearch", recebe como novo estado o value digitado. 
E também a propriedade "isDisabled" recebera o resultado da condicao de value.length < MIN_CHAR(nesta é 2), sendo assim se for true o botao permanece desabilitado e se for false ele sera habilitado. 
Essa condicao permite que ao inserir ou apagar caracteres a condicao altere o estado do botao.

Com o botao desabilitado, vamos pesquisar as informações usando a funcao handleClickSearch. 
Ao ser clicado a funcao e chamada e usa setState setando novos estados para: 
--> "isLoading"(true) - para criarmos a condicao de exibicao de "Carregando..." na tela enquanto nao houver retorno da funcao fetchArtistAlbum(que chama searchAlbumAPI);
--> limpa o campo do input(inputSearch: ''); 
--> shouldForm(false) - ocultando os campos de input e botao;
--> shoulResultSearch(true) - para criarmos a condicao de exibicao do texto e resultado da pesquisa na tela(component SearchResult); e 
--> chama a fecthArtistAlbum() para ser executada. 
Esta por sua vez, desestrutura inputSearch de this state, cria uma constante "albunsEncontrados" que recebe o resultado da funcao assincrona searchAlbumAPI(inputSearch), apos retornada, utiliza o setState e altera os estados de "isLoading"(false), shouldForm(true), searchedArtist(inputSearch) e albuns recebe como valor um array com um spread da constante albunsEncontrados. 

Ao renderizar a pagina, sao colocadas as seguintes condições:
--> se "isLoading" for true(sera enquanto fecthArtistAlbum() nao retornar) vai renderizar o componente Loading que apresenta o texto "Carregando..." na tela;
--> Renderizacao condicional para ocultar/exibir o formulario de pesquisa por meio do state de shouldForm; 
--> renderizacao condicional do componente SearchResult se albuns for diferente de null.

Componente SearchResult recebe como props: albuns, o artist={searchArtist} e o state shouldResultSearch.

ShouldResultSearch sendo true, renderiza o texto Resultado de albuns de: { artist }, faz um map em albuns onde cada album renderizara uma div contendo:
- uma imagem;
- um titulo com o nome do artista;
- um paragrafo com o nome do album;
seguidos de um link que direciona para os detalhes do album(id) que, se selecionado, mostrara todas as musicas contidas nele.

## 7. Crie a lista de músicas do álbum selecionado

Exibicao da lista de musicas do album, este se da clicando no link do requisito anterior e é contemplado na pages Album.

O arquivo comeca com todos os imports necessarios.

Ao entrar na página a funcao assincrona getMusics é chamada. 

<--------------------------------------------------------------------------------------------------->

Criei um state "album" que sera, inicialmente, um array vazio. Ele recebera posteriormente, o resultado de getMusics que sera um array de objetos com as musicas do album selecionado.
Criei uma funcao fetchAlbumDetails() que será chamada dentro do componentDidMount() apos execucao do render().
A fecthAlbumDetails busca na props da Route o id do album, esse id se encontra dentro de matchs /params / id, cria uma constante "album" que recebera como valor o resultado de getMusics(id) e setara novo state para "album" recebendo um array com um spread da const album.

Ao renderizar a pagina, sao colocadas as seguintes condições:

Se album retornar vazio, exibira "Carregando.." na tela por meio do componente Loading.

Como identifiquei que o array de objetos na primeira posicao se tratava das informacoes do album, ou seja, somente a capa, desestruturei desta, as informacoes para exibicao do nome do artista e do nome do album, exibidos no h3 e h4, seguidos do componente MusicCard recebendo album sem a primeira posicao, para renderizar as musicas do album e suas particularidades. Escolhi fazer o slice, pois ele nao altera o array original, diferente do splice.

MusicCard por meio do album.map cria uma div e dentro dela: 
- um span que renderiza o nome da musica, 
- uma label com o texto "Favorita" juntamente com um input checkBox. 
Em outra div:
- a tag audio, onde renderiza o preview de ate 30seg da musica e insere no atributo checked o state favorites na posicao i (i refere-se ao indice da musica dentro do map) --> favorites[i] sera sempre false(refere-se a vinculacao da posicao da musica dentro de album e que sera favoritada posteriormente, sera explicado nos proximos requisitos). 

## 8. Crie o mecanismo para adicionar músicas na lista de músicas favoritas

Com as musicas do album, posso marcar as musicas favoritas, este se da selecionando o checkbox(favorita) é contemplado no componente MusicCard.

O arquivo comeca com todos os imports necessarios.

Aqui usaremos a funcao assincrona addSongs que esta sendo chamada na funcao addFavoriteSong.

<--------------------------------------------------------------------------------------------------->

Inicialmente insiro props, como argumento do constructor e super, para que possa receber o "album" fora do render. Crio dois states: "isLoading"(false) e favorites que recebe um array gerado por meio do album.map onde para cada musica sera gerado um "false", isso sera usado como state inicial do checkbox, que ao abrir o album, inicialmente, nenhum estara selecionado.

Se album estiver vazio ou undefined sera exibido o texto 'Nenhum item na lista de músicas favoritas.'

O input checkbox, ao ser gerado, recebe:
- o favorites[i];
- onChange: onde tera uma callback que executara a funcao handleChangeFavorite recebendo i(map) e o event.

HandleChangeFavorite(index, {target}) -> desestrutura:
- o target de event;
- album das props;
- checked de target; e 
seta novo state por meio de setState com uma callback que tem parametro favorites desestruturado do prevState, "favorites" na posicao index recebida tera valor checked e retorna "favorites" com um novo array (prevState favorites), com true ou false em cada posicao da musica, sendo tambem o resultado do checked que se mantem marcado nas posicoes "true". 

Selecionando o checkBox, é chamada a funcao addFavoriteSong(recebendo album[index]--> objeto contendo os dados da musica favoritada).

Chamada, addFavoriteSong seta o state de "isLoading" para true, executa a funcao assincrona addSong() recebendo album[index] --> que aqui se chama music <-- onde salvara, no localStorage, o objeto com os dados da musica. Apos sua execucao, seta novamente o "isLoading" para false.
Permite que permaneca na tela, a lista de musicas com o checkbox selecionado ou nao.

Essa condicao se refere aos requisitos seguintes:
Desmarcando o checkBox, é chamada a funcao removeSong(recebendo album[index]--> objeto contendo os dados da musica "desfavoritadas").


## 9. Faça a requisição para recuperar as músicas favoritas ao entrar na página do Álbum

## 10. Faça a requisição para recuperar as músicas favoritas e atualizar a lista após favoritar uma música

## 11. Crie o mecanismo para remover músicas na lista de músicas favoritas

Ao entrar no id do Album, as musicas que ja foram favoritadas devem estar com checkbox marcado. Ao marcar/desmarcar o campo deve atualizar a lista de favoritas.

Usado o mesmo componente e estrutura do requisito 8. 
Pra mim fez sentido usar o mesmo, pois é onde está sendo renderizada a lista de musicas de cada album.

<--------------------------------------------------------------------------------------------------->

O arquivo comeca com todos os imports necessarios.

a funcao assincrona getFavoriteSongs() devera ser executada ao abrir a pagina, buscando todas as musicas salvas no localStorage como favoritas, sendo assim, a chamo/executo no componetDidMount por meio da funcao getFavorites().

getFavorites por sua vez:
- desestrutura album das props;
- seta o "isLoading" para true;
- executa a callback criando uma const getFavorites que armazenara o resultado de getFavoriteSongs e com o retorno verifica seguinte condicao:
--> se for diferente de undefined e array vazio, cria-se uma const checkFavorites que tera como valor o resultado do map em album, onde para cada item sera verificado se existe algum elemento em getFavorites em que o item.trackId do album seja igual ao element.trackId da lista de favoritas recuperada. 
O novo estado sera setado em favorites que recebera novo array com spread de checkFavorites e "isLoading" sera false. Caso contrario, sera setado somente "isLoading" para false.

favorites[i] esta sendo atribuido no checked da lista, onde sera true ou false.

Mencionado no requisito anterior:
Desmarcando o checkBox (condicao elencada na handleChangeFavorite), é chamada a funcao assincrona removeSong(recebendo album[index]). Ela seta o state de "isLoading" para true, depois que obtiver retorno seta "isLoading" para false e remove do localStorage o objeto contendo os dados da musica desmarcada.


## 12. Crie a lista de músicas favoritas

Ao clicar na rota "Favorites" deve renderizar somente a lista de musicas favoritas. Requisito contemplado na page "Favorites".

<--------------------------------------------------------------------------------------------------->

O arquivo comeca com todos os imports necessarios.

Criei dois states - "isLoading" que inicia com false e favoriteList que inicia com um array vazio, posteriormente recebera o array de objeto com os dados de cada musica favoritada.

Ao abrir a pagina a funcao getFavoritesSongs() sera chamada pelo componentDidMount. 
Ao ser chamada?
- seta "isLoading" para true;
- cria a const getFavoritList que recebera como valor o resultado da funcao assincrona getFavoritesSongs() --> que traz um array de objetos com os dados de todas as musicas favoritadas anteriormente e salvas no localStorage. 
Apos recuperar as informacoes, seta o state de "isLoading" para false e atribui a favoritList, um spread da constante getFavoritList.

A funcao onRemove ira atualizar a lista renderizada, caso algum item seja desmarcado nessa page, e:
- recebe o album[index] como argumento;
- desestrutura a favoriteList de this.state;
- cria uma constante que armazenara as musicas remanescentes na lista de favoritas, filtrando dentro de favoriteList as musicas cujo trackId seja diferente trackId da musica desmarcada.
FavoritList é atualizada com o spread das musicas remanescentes.
A lista de musicas sera atualizada e renderizada novamente por meio de MusicCard recebendo favoritList - como "album" -  e onRemove como props.

No componente MusicCard, a funcao handleChangeFavorite cria uma condicao que se o checked estiver false (alem de chamar uma funcao especifica para outro requisito) condiciona se onRemove(recebido como props) for diferente de undefined chamara onRemove(passando album[index]). 

