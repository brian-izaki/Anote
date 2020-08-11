class AnotacaoDAO{
  constructor(){
    this.key = 'anotacoes';
  }

  cadastrar(json){
    const data = JSON.stringify(json);
    window.localStorage.setItem(this.key, data);
  }

  listar(){
    const data = window.localStorage.getItem(this.key);
    // console.log('listar', data)
    return JSON.parse(data) || [];
  }

  deletar(id){
    const anotacoes = this.listar();
    let itemPosition;

    for(let i = 0; i < anotacoes.length ; i ++){
      if (anotacoes[i].id === id){
        itemPosition = i;
      }
    };

    // splice retira uma posição os argumentos passados são 
    // posição e a quantidade depois dela (se não passado nada
    // retira todo resto).
    anotacoes.splice(itemPosition, 1);

    // console.log(id, itemPosition);
    // console.log(anotacoes);
    this.cadastrar(anotacoes);
  }
}

export default AnotacaoDAO;