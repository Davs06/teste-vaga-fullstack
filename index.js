const { log } = require('console');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];


// Lendo o CSV e criando um array de objetos

function readCSV(callback) {

    fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) =>  results.push(data) )
    .on('end', () => { 
       // console.log(results);
        callback(results) 
    })
    .on('error', (error) => console.error('Error reading CSV file:', error))
}



//  **************** desafios propostos resolvidos por funções 



// função para formatar os valores para real

function realFormatter(value) {
    const realFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }) 

    value.forEach(row => {
        
        if (row.vlTotal) {
            row.vlTotal = realFormatter.format(row.vlTotal)
            console.log(`${nmClient} Valor Total: ${row.vlTotal}`);
            
        }
        if (row.vlPresta) {
            row.vlPresta = realFormatter.format(row.vlPresta)
            console.log(`${nmClient} Valor Total: ${row.vlPresta}`);
        }
        if (row.vlMora) {
            row.vlMora = realFormatter.format(row.vlMora)
            console.log(`${nmClient} Valor Total: ${row.vlMora}`);
        }
        if (row.vlMulta) {
            row.vlMulta = realFormatter.format(row.vlMulta)
            console.log(`${nmClient} Valor Total: ${row.vlMulta}`);
        }
        if (row.vlOutAcr) {
            row.vlOutAcr = realFormatter.format(row.vlOutAcr)
            console.log(`${nmClient} Valor Total: ${row.vlOutAcr}`);
        }
        if (row.vlIof) {
            row.vlIof = realFormatter.format(row.vlIof)
            console.log(`${nmClient} Valor Total: ${row.vlIof}`);
        }
        if (row.vlDescon) {
            row.vlDescon = realFormatter.format(row.vlDescon)
            console.log(`${nmClient} Valor Total: ${row.vlDescon}`);
        }
        if (row.vlAtual) {
            row.vlAtual = realFormatter.format(row.vlAtual)
            console.log(`${nmClient} Valor Total: ${row.vlAtual}`);
        }
        
    });
    // console.log(value);
}


// função para validar CPF ou CNPJ

function validationCpfCnpj(value) {

    value.forEach(row => {
    if (row.nrCpfCnpj.length === 11 || row.nrCpfCnpj.length === 14) {

        
        if(row.nrCpfCnpj.length === 11){
            row.nrCpfCnpj = row.nrCpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            console.log(`${row.nrCpfCnpj} Numero de CPF valido`)
        } else if (row.nrCpfCnpj.length === 14) {
            row.nrCpfCnpj = row.nrCpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
            console.log(`${row.nrCpfCnpj} Numero de CNPJ valido`)
        }

        return row.nrCpfCnpj 

    }else{
        console.log(`${row.nrCpfCnpj} CPF ou CNPJ inválido `)
        return row.nrCpfCnpj = `${row.nrCpfCnpj} CPF ou CNPJ inválido `
    }
})
    // console.log(value)
}


// função para validar o valor total das prestações

function validationPrestacoes(value) {

    
    value.forEach(row => {
        
        var div = parseFloat(row.vlTotal) / parseFloat(row.qtPrestacoes) 
        
        if (div === row.vlPresta) {      
                return console.log(`O valor de ${row.vlPresta = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.vlTotal)} das prestações esta correto`)
            }else{
                return console.log(`O valor de ${row.vlPresta = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.vlTotal)} das prestações esta incorreto o valor deve ser ${div = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(div)}`)
            }
        })
}


//  ***************** Chamada das funções

// readCSV(realFormatter)    //formatação dos valores para real
// readCSV(validationCpfCnpj)    //validação do CPF ou CNPJ
// readCSV(validationPrestacoes)    //validação do valor total das prestações
