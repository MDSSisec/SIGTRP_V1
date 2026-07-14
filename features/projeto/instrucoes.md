Depois criaria uma configuração

Por exemplo

const TED = {
    sections: [
        "identificacao",
        "descricao",
        "participantes",
        "monitoramento"
    ]
}

Outro tipo

const EMENDA = {
    sections: [
        "identificacao",
        "descricao",
        "planilhas"
    ]
}

Outro

const CONVENIO = {
    sections: [
        "identificacao",
        "descricao",
        "participantes",
        "planilhas",
        "monitoramento",
        "prestacao"
    ]
}

A tela monta tudo automaticamente.

----

Eu iria além

Hoje você tem algo como

sections-map.tsx

Eu transformaria isso no cérebro do sistema.

Algo assim:

ProjetoTipo.TED

↓

SectionConfig[]

↓

Componente

↓

Tabela

↓

Permissões

↓

Obrigatória?

↓

Ordem

↓

Pode revisar?

↓

Pode exportar?

Cada seção teria uma configuração completa.

Por exemplo:

{
    id: "identificacao",

    title: "Identificação",

    component: IdentificacaoProjeto,

    repository: ProjetoIdentificacaoRepository,

    required: true,

    review: true
}

A aplicação inteira passa a ser dirigida por configuração.