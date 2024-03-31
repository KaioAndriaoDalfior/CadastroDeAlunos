document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const index = queryParams.get('index');
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    if (index !== null && index >= 0 && index < alunos.length) {
        const alunoSelecionado = alunos[index];

        if (alunoSelecionado) {
            const fotoBase64 = alunoSelecionado.foto;
            const nome = alunoSelecionado.nome;
            const sobrenome = alunoSelecionado.sobrenome;
            const cpf = alunoSelecionado.cpf;
            const altura = alunoSelecionado.altura;
            const peso = alunoSelecionado.peso;
            const faixa = alunoSelecionado.faixa;
            const grau = alunoSelecionado.grau;

            document.getElementById('aluno-foto').src = fotoBase64;

            const alunoInfo = `
                <p><strong>Nome:</strong> ${nome} ${sobrenome}</p>
                <p><strong>CPF:</strong> ${cpf}</p>
                <p><strong>Altura:</strong> ${altura} metros</p>
                <p><strong>Peso:</strong> ${peso} kg</p>
                <p><strong>Faixa:</strong> ${faixa}</p>
                <p><strong>Grau:</strong> ${grau}</p>
            `;

            document.getElementById('aluno-info').innerHTML = alunoInfo;
        } else {
            document.getElementById('aluno-info').textContent = 'Nenhum aluno selecionado.';
        }
    } else {
        document.getElementById('aluno-info').textContent = 'Índice de aluno inválido.';
    }
});
