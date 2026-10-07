const CHAVE_STORAGE='minhasTarefasDados';
let dados={nome:'',senha:'',tarefas:[],eventos:[]};
function salvarDados(){
try{
localStorage.setItem(CHAVE_STORAGE,JSON.stringify(dados));
}catch(erro){
console.error('Erro ao salvar os dados:',erro);
}
}
function carregarDados(){
const dadosSalvos=localStorage.getItem(CHAVE_STORAGE);
if(!dadosSalvos)return;
try{
const dadosCarregados=JSON.parse(dadosSalvos);
dados={
nome:dadosCarregados.nome||'',
senha:dadosCarregados.senha||'',
tarefas:Array.isArray(dadosCarregados.tarefas)?dadosCarregados.tarefas:[],
eventos:Array.isArray(dadosCarregados.eventos)?dadosCarregados.eventos:[]
};
}catch(erro){
console.error('Erro ao carregar os dados:',erro);
dados={nome:'',senha:'',tarefas:[],eventos:[]};
}
}
const botaoNovidades=document.getElementById('botao-novidades');
if(botaoNovidades){
botaoNovidades.addEventListener('click',function(){
alert(`NOVIDADES DO APLICATIVO
• Sistema de Perfil
• Sistema de Login
• Login salvo no navegador
• Nome do usuário salvo
• Navegação entre as telas
• Tela de Datas
• Cadastro de eventos
• Eventos com data
• Eventos salvos no navegador
• Eventos exibidos no Perfil
• Exclusão de eventos
• Histórico de tarefas
• Tarefas concluídas
• Tarefas excluídas
• Contador de tarefas
• Botão de modo escuro
• Ícone do modo escuro muda entre lua e sol
• Botão de menu
• Navegação pelo botão voltar do navegador
• Dados preservados ao trocar de tela
• Dados preservados ao atualizar a página
• Dados salvos depois de fechar e abrir o navegador`);
});
}
const campoTarefa=document.getElementById('campo-tarefa');
const botaoAdicionar=document.getElementById('botao-adicionar');
const listaTarefas=document.getElementById('lista-tarefas');
const contadorTarefas=document.getElementById('contador-tarefas');
const botaoTema=document.getElementById('botao-tema');
function atualizarContador(){
if(!contadorTarefas)return;
const total=dados.tarefas.filter(t=>!t.excluida).length;
if(total===0)contadorTarefas.textContent='0 tarefas na Lista';
else if(total===1)contadorTarefas.textContent='1 tarefa na Lista';
else contadorTarefas.textContent=`${total} tarefas na Lista`;
}
function mostrarTarefas(){
if(!listaTarefas)return;
listaTarefas.innerHTML='';
dados.tarefas.forEach((tarefa,index)=>{
if(tarefa.excluida)return;
const item=document.createElement('li');
item.className='item-tarefa';
if(tarefa.concluida)item.classList.add('item-tarefa-concluida');
const texto=document.createElement('span');
texto.textContent=tarefa.texto;
const acoes=document.createElement('div');
acoes.className='acoes-tarefa';
const concluir=document.createElement('button');
concluir.className='botao-acao concluir';
concluir.innerHTML='<i class="fa-solid fa-check"></i>';
const excluir=document.createElement('button');
excluir.className='botao-acao excluir';
excluir.innerHTML='<i class="fa-solid fa-trash"></i>';
concluir.addEventListener('click',function(){
dados.tarefas[index].concluida=!dados.tarefas[index].concluida;
salvarDados();
mostrarTarefas();
mostrarPerfil();
});
excluir.addEventListener('click',function(){
dados.tarefas[index].excluida=true;
salvarDados();
mostrarTarefas();
mostrarPerfil();
});
acoes.appendChild(concluir);
acoes.appendChild(excluir);
item.appendChild(texto);
item.appendChild(acoes);
listaTarefas.appendChild(item);
});
atualizarContador();
}
function adicionarTarefa(){
if(!campoTarefa)return;
const texto=campoTarefa.value.trim();
if(texto==='')return;
dados.tarefas.push({texto:texto,concluida:false,excluida:false});
salvarDados();
campoTarefa.value='';
campoTarefa.focus();
mostrarTarefas();
mostrarPerfil();
}
if(botaoAdicionar)botaoAdicionar.addEventListener('click',adicionarTarefa);
if(campoTarefa)campoTarefa.addEventListener('keypress',function(e){
if(e.key==='Enter')adicionarTarefa();
});
if(botaoTema)botaoTema.addEventListener('click',function(){
document.body.classList.toggle('modo-escuro');
const icone=botaoTema.querySelector('i');
if(icone){
icone.className=document.body.classList.contains('modo-escuro')?'fa-solid fa-sun':'fa-solid fa-moon';
}
});
function encontrarElemento(ids){
for(let i=0;i<ids.length;i++){
const elemento=document.getElementById(ids[i]);
if(elemento)return elemento;
}
return null;
}
const menu=encontrarElemento(['botao-menu','menu']);
const menuLateral=encontrarElemento(['menu-lateral']);
const fecharMenu=encontrarElemento(['botao-fechar-menu','fechar-menu']);
const abrirPerfil=encontrarElemento(['abrir-perfil','menu-perfil','botao-perfil']);
const abrirDatas=encontrarElemento(['abrir-datas','menu-datas','botao-datas']);
const telaInicial=encontrarElemento(['pagina-inicial','tela-inicial','inicio']);
const telaPerfil=encontrarElemento(['tela-perfil','pagina-perfil','perfil']);
const telaLogin=encontrarElemento(['tela-login','pagina-login','login']);
const telaLoginDatas=encontrarElemento(['tela-login-datas','login-datas']);
const telaDatas=encontrarElemento(['tela-datas','pagina-datas','datas']);
const botaoLogin=encontrarElemento(['botao-login']);
const botaoLoginDatas=encontrarElemento(['botao-login-datas']);
const nomeLogin=encontrarElemento(['nome-login']);
const senhaLogin=encontrarElemento(['senha-login']);
const nomeLoginDatas=encontrarElemento(['nome-login-datas']);
const senhaLoginDatas=encontrarElemento(['senha-login-datas']);
const mensagemLogin=encontrarElemento(['mensagem-login']);
const mensagemLoginDatas=encontrarElemento(['mensagem-login-datas']);
const nomePerfil=encontrarElemento(['nome-perfil']);
const nomeDatas=encontrarElemento(['nome-datas']);
const tarefasPendentes=encontrarElemento(['tarefas-pendentes']);
const tarefasConcluidas=encontrarElemento(['tarefas-concluidas']);
const campoEvento=encontrarElemento(['campo-evento','nome-evento']);
const campoData=encontrarElemento(['campo-data','data-evento']);
const botaoEvento=encontrarElemento(['botao-evento','adicionar-evento']);
const listaEventos=encontrarElemento(['lista-eventos']);
const mensagemEvento=encontrarElemento(['mensagem-evento']);
function estaLogado(){
return dados.nome!==''&&dados.senha!=='';
}
function atualizarNomeNasTelas(){
if(nomePerfil)nomePerfil.textContent=dados.nome||'Usuário';
if(nomeDatas)nomeDatas.textContent=dados.nome||'Usuário';
if(nomeLogin)nomeLogin.value=dados.nome||'';
if(nomeLoginDatas)nomeLoginDatas.value=dados.nome||'';
}
function obterTelas(){
const telas=[];
document.querySelectorAll('.tela').forEach(t=>telas.push(t));
[telaInicial,telaPerfil,telaLogin,telaLoginDatas,telaDatas].forEach(t=>{
if(t&&!telas.includes(t))telas.push(t);
});
return telas;
}
function mostrarTela(tela){
if(!tela)return;
obterTelas().forEach(t=>t.classList.remove('ativa'));
tela.classList.add('ativa');
if(menuLateral)menuLateral.classList.remove('aberto');
atualizarNomeNasTelas();
}
function irPara(tela,hash){
mostrarTela(tela);
if(window.location.hash!==hash){
history.pushState({pagina:hash},'',hash);
}
}
function mostrarPerfil(){
if(tarefasPendentes)tarefasPendentes.innerHTML='';
if(tarefasConcluidas)tarefasConcluidas.innerHTML='';
dados.tarefas.forEach(tarefa=>{
const item=document.createElement('div');
item.className='tarefa-historico';
if(tarefa.excluida){
item.classList.add('excluida');
item.textContent=tarefa.texto+' — Excluída';
if(tarefasConcluidas)tarefasConcluidas.appendChild(item);
}else if(tarefa.concluida){
item.classList.add('concluida');
item.textContent=tarefa.texto;
if(tarefasConcluidas)tarefasConcluidas.appendChild(item);
}else{
item.textContent=tarefa.texto;
if(tarefasPendentes)tarefasPendentes.appendChild(item);
}
});
mostrarEventosNoPerfil();
}
function formatarData(data){
if(!data)return'';
const partes=data.split('-');
if(partes.length!==3)return data;
return partes[2]+'/'+partes[1]+'/'+partes[0];
}
function mostrarEventos(){
if(!listaEventos)return;
listaEventos.innerHTML='';
dados.eventos.forEach((evento,index)=>{
const item=document.createElement('div');
item.className='evento';
const informacoes=document.createElement('div');
informacoes.className='evento-info';
const titulo=document.createElement('strong');
titulo.textContent=evento.nome;
const data=document.createElement('span');
data.className='evento-data';
data.textContent=formatarData(evento.data);
const excluir=document.createElement('button');
excluir.className='botao-acao excluir';
excluir.innerHTML='<i class="fa-solid fa-trash"></i>';
excluir.addEventListener('click',function(){
dados.eventos.splice(index,1);
salvarDados();
mostrarEventos();
mostrarEventosNoPerfil();
});
informacoes.appendChild(titulo);
informacoes.appendChild(data);
item.appendChild(informacoes);
item.appendChild(excluir);
listaEventos.appendChild(item);
});
}
function mostrarEventosNoPerfil(){
if(!telaPerfil)return;
let caixa=document.getElementById('eventos-perfil');
if(!caixa){
caixa=document.createElement('div');
caixa.id='eventos-perfil';
caixa.className='caixa-perfil';
const destino=telaPerfil.querySelector('.perfil-colunas')||telaPerfil;
destino.appendChild(caixa);
}
caixa.innerHTML='';
const titulo=document.createElement('h2');
titulo.textContent='EVENTOS:';
caixa.appendChild(titulo);
if(dados.eventos.length===0){
const vazio=document.createElement('div');
vazio.className='tarefa-historico';
vazio.textContent='Nenhum evento cadastrado';
caixa.appendChild(vazio);
return;
}
dados.eventos.forEach(evento=>{
const item=document.createElement('div');
item.className='tarefa-historico';
const nome=document.createElement('span');
nome.textContent=evento.nome;
const data=document.createElement('span');
data.textContent=formatarData(evento.data);
item.appendChild(nome);
item.appendChild(data);
caixa.appendChild(item);
});
}
function adicionarEvento(){
if(!campoEvento||!campoData)return;
const nome=campoEvento.value.trim();
const data=campoData.value;
if(nome===''){
if(mensagemEvento)mensagemEvento.textContent='Digite o nome do evento.';
return;
}
if(data===''){
if(mensagemEvento)mensagemEvento.textContent='Escolha a data do evento.';
return;
}
dados.eventos.push({nome:nome,data:data});
salvarDados();
campoEvento.value='';
campoData.value='';
if(mensagemEvento)mensagemEvento.textContent='';
mostrarEventos();
mostrarEventosNoPerfil();
}
function fazerLogin(nome,senha,mensagem,destino,hash){
nome=nome.trim();
senha=senha.trim();
if(nome===''){
if(mensagem)mensagem.textContent='Digite seu nome.';
return;
}
if(senha===''){
if(mensagem)mensagem.textContent='Digite sua senha.';
return;
}
if(!estaLogado()){
dados.nome=nome;
dados.senha=senha;
salvarDados();
}else if(dados.nome!==nome||dados.senha!==senha){
if(mensagem)mensagem.textContent='Nome ou senha incorretos.';
return;
}
if(mensagem)mensagem.textContent='';
atualizarNomeNasTelas();
mostrarPerfil();
mostrarEventos();
irPara(destino,hash);
}
if(menu)menu.addEventListener('click',function(){
if(menuLateral)menuLateral.classList.add('aberto');
});
if(fecharMenu)fecharMenu.addEventListener('click',function(){
if(menuLateral)menuLateral.classList.remove('aberto');
});
if(abrirPerfil)abrirPerfil.addEventListener('click',function(){
if(estaLogado()){
mostrarPerfil();
irPara(telaPerfil,'#perfil');
}else{
irPara(telaLogin,'#login');
}
});
if(abrirDatas)abrirDatas.addEventListener('click',function(){
if(estaLogado()){
mostrarEventos();
irPara(telaDatas,'#datas');
}else{
irPara(telaLoginDatas,'#login-datas');
}
});
if(botaoLogin)botaoLogin.addEventListener('click',function(){
fazerLogin(nomeLogin?nomeLogin.value:'',senhaLogin?senhaLogin.value:'',mensagemLogin,telaPerfil,'#perfil');
});
if(botaoLoginDatas)botaoLoginDatas.addEventListener('click',function(){
fazerLogin(nomeLoginDatas?nomeLoginDatas.value:'',senhaLoginDatas?senhaLoginDatas.value:'',mensagemLoginDatas,telaDatas,'#datas');
});
if(nomeLogin)nomeLogin.addEventListener('keypress',function(e){
if(e.key==='Enter'&&botaoLogin)botaoLogin.click();
});
if(senhaLogin)senhaLogin.addEventListener('keypress',function(e){
if(e.key==='Enter'&&botaoLogin)botaoLogin.click();
});
if(nomeLoginDatas)nomeLoginDatas.addEventListener('keypress',function(e){
if(e.key==='Enter'&&botaoLoginDatas)botaoLoginDatas.click();
});
if(senhaLoginDatas)senhaLoginDatas.addEventListener('keypress',function(e){
if(e.key==='Enter'&&botaoLoginDatas)botaoLoginDatas.click();
});
if(botaoEvento)botaoEvento.addEventListener('click',adicionarEvento);
if(campoEvento)campoEvento.addEventListener('keypress',function(e){
if(e.key==='Enter')adicionarEvento();
});
window.addEventListener('popstate',function(){
const hash=window.location.hash;
if(hash==='#datas'){
if(estaLogado()){
mostrarEventos();
mostrarTela(telaDatas);
}else{
mostrarTela(telaLoginDatas);
}
return;
}
if(hash==='#login-datas'){
if(estaLogado()){
mostrarTela(telaDatas);
}else{
mostrarTela(telaLoginDatas);
}
return;
}
if(hash==='#perfil'){
if(estaLogado()){
mostrarPerfil();
mostrarTela(telaPerfil);
}else{
mostrarTela(telaLogin);
}
return;
}
if(hash==='#login'){
if(estaLogado()){
mostrarTela(telaPerfil);
}else{
mostrarTela(telaLogin);
}
return;
}
mostrarTela(telaInicial);
});
carregarDados();
mostrarTarefas();
mostrarPerfil();
mostrarEventos();
atualizarNomeNasTelas();
if(window.location.hash==='#perfil'){
if(estaLogado())mostrarTela(telaPerfil);
else mostrarTela(telaLogin);
}else if(window.location.hash==='#datas'){
if(estaLogado())mostrarTela(telaDatas);
else mostrarTela(telaLoginDatas);
}else if(window.location.hash==='#login'||window.location.hash==='#login-datas'){
if(estaLogado())mostrarTela(telaInicial);
else mostrarTela(telaLogin);
}else{
mostrarTela(telaInicial);
}

