# CRUD-Produto-Preco
Este projeto é um CRUD de produtos e preços que consume uma API externa hospedada no Netlify.

Link do projeto: https://crud-produto-preco.netlify.app/

# api-Produto-Vercel
Esta API em Node está hospedada no Vercel para ser consumida.

Link da API: https://api-produto-vercel.vercel.app/

# Conheça também:

Um pesquisador de endereços por CEP em: https://jose-henrique-a.github.io/FormularioComAutoPreenchimentoPeloCEP/

Um personal trainer digital online em: https://josehenrique.pythonanywhere.com/

Uma calculadora de preço médio dos seus dólares investidos: https://jose-henrique-a.github.io/Preco-medio-dolar/

Uma aplicação para consumir uma API, gerenciador de contatos : https://jose-henrique-a.github.io/Gerendiador-de-Contatos/

Aplicação que cria API e disponibiliza através de um servidor : https://web-production-eedc.up.railway.app/

Um blog de carros em: https://jose-henrique-a.github.io/Blog-da-Evolucao-dos-Carros/

Link para o app Versão Web: https://jose-henrique-a.github.io/APP-Flutter/ Banco de dados fica em seu navegador.

E aqui o link da versão aplicativo(APK) para Android, com banco de dados "dentro" do aplicativo. Clique e baixe direto no seu celular: https://drive.google.com/uc?export=download&id=1OKlwvRrfFhaCdTnMgXMBzG-yJm_Aa2dK 

Como este app está fora da Play Store, você precisa conceder permissões em seu celular para baixar aplicativos de fontes externas.

## Deploy do JSON Server na Vercel

Um template para fazer o deploy do [JSON Server](https://github.com/typicode/json-server) na [Vercel](https://vercel.com) permite que você rode uma API REST fake (mock API) online!

Demonstração deste repositório: 

1. [https://json-server-vercel-api.vercel.app/](https://json-server-vercel-api.vercel.app/)
2. [https://json-server-vercel-api.vercel.app/produtos](https://json-server-vercel-api.vercel.app/produtos)

### Como utilizar

1. Clique em "**Use this template**" ou clone este repositório.
2. Atualize o [`db.json`](./db.json) ou utilize o padrão no repositório.
3. Crie uma conta ou faça login na [Vercel](https://vercel.com).
4. A partir da dashboard da Vercel, clique "**+ New Project**" e então "**Import**" seu repositório.
5. Na tela "**Configure Project**", deixe tudo padrão e clique "**Deploy**".
6. Aguarde até que o deploy esteja terminado e o seu próprio JSON Server está pronto para uso!

## `db.json` padrão

```json
[
  {
    "id": 1,
    "descricao": "Sapato Social New York",
    "preco": "199.90",
    "imagem": "produto.webp"
  }
]
```

## Referências
1. Professor Anderson Fontes : https://github.com/andersonfontes
2. https://github.com/typicode/json-server
3. https://vercel.com
4. https://shadowsmith.com/how-to-deploy-an-express-api-to-vercel
5. https://github.com/kitloong/json-server-vercel