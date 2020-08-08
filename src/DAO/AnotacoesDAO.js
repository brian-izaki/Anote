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
}

export default AnotacaoDAO;