document.getElementById('btn-cadastrar').addEventListener('click', function() {
    document.getElementById('form-title').textContent = 'Cadastrar Aluno';
    document.getElementById('btn-salvar').textContent = 'Cadastrar';
    document.getElementById('form-container').style.display = 'block';
});

document.getElementById('aluno-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fotoInput = document.getElementById('foto');
    const foto = fotoInput.files[0];
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cpf = document.getElementById('cpf').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const faixa = document.getElementById('faixa').value;
    const grau = document.getElementById('grau').value;

    const aluno = {
        foto: URL.createObjectURL(foto),
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        altura: altura,
        peso: peso,
        faixa: faixa,
        grau: grau
    };

    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const editIndex = parseInt(localStorage.getItem('editIndex'));

    if (editIndex !== null && editIndex >= 0) {
        alunos[editIndex] = aluno;
        localStorage.setItem('editIndex', null);
    } else {
        alunos.push(aluno);
    }

    localStorage.setItem('alunos', JSON.stringify(alunos));
    document.getElementById('aluno-form').reset();
    document.getElementById('form-container').style.display = 'none';
    showAlunos();
});

document.getElementById('btn-limpar').addEventListener('click', function() {
    localStorage.removeItem('alunos');
    showAlunos();
});

function showAlunos() {
    const alunosList = document.getElementById('alunos-list');
    alunosList.innerHTML = '';

    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.forEach((aluno, index) => {
        const div = document.createElement('div');
        div.className = 'aluno';
        const img = document.createElement('img');
        img.src = aluno.foto;
        img.alt = aluno.nome;
        div.appendChild(img);
        const nomeP = document.createElement('p');
        nomeP.textContent = aluno.nome;
        div.appendChild(nomeP);

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.classList.add('btn-remover');
        btnRemover.addEventListener('click', () => {
            alunos.splice(index, 1);
            localStorage.setItem('alunos', JSON.stringify(alunos));
            showAlunos();
        });
        div.appendChild(btnRemover);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('btn-editar');
        btnEditar.addEventListener('click', () => {
            localStorage.setItem('editIndex', index);
            document.getElementById('form-title').textContent = 'Editar Aluno';
            document.getElementById('btn-salvar').textContent = 'Salvar Alterações';
            document.getElementById('form-container').style.display = 'block';
            document.getElementById('nome').value = aluno.nome;
            document.getElementById('sobrenome').value = aluno.sobrenome;
            document.getElementById('cpf').value = aluno.cpf;
            document.getElementById('altura').value = aluno.altura;
            document.getElementById('peso').value = aluno.peso;
            document.getElementById('faixa').value = aluno.faixa;
            document.getElementById('grau').value = aluno.grau;
        });
        div.appendChild(btnEditar);

        const btnVisualizar = document.createElement('button');
        btnVisualizar.textContent = 'Visualizar Aluno';
        btnVisualizar.classList.add('btn-visualizar');
        btnVisualizar.addEventListener('click', () => {
            window.location.href = `CadastrarAlunos/profile.html?index=${index}`;
        });
        div.appendChild(btnVisualizar);

        alunosList.appendChild(div);
    });
}

showAlunos();
