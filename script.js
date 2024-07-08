//declarando elementos globais
const enviarBtn = document.querySelector('.enviar');
const fileInput = document.querySelector('.fileInput');
const searchInput = document.querySelector('.tagName');
const resultDiv = document.querySelector('.resultados');

//declarando campos para resultados totais
const resultConsInic = document.querySelector('.consultasIniciais');
const resultProcPrevent = document.querySelector('.procedimentosPreventivos');
const resultEndoConclDentesP = document.querySelector('.dentesPermanentes');
const resultProtesesUnitarias = document.querySelector('.protesesUnitarias');
const resultRaspSupraGengHemi = document.querySelector('.raspagemSupra');
const resultVidasAtivasGP1 = document.querySelector('.vidasAtivasGP1');
const resultVidasAtivasGP2 = document.querySelector('.vidasAtivasGP2');

//declarando campos para resultados IF
const resultVidasIndividualFamiliar = document.querySelector('.vidasIndividualFamiliar');
const resultConsultasIniciaisIndividualFamiliar = document.querySelector('.consultasIniciaisIndividualFamiliar');
const resultProcedimentosPreventivosIndividualFamiliar = document.querySelector('.procedimentosPreventivosIndividualFamiliar');
const resultEndoConclDentesPIndividualFamiliar = document.querySelector('.dentesPermanentesIndividualFamiliar');
const resultDentesPermanentesIndividualFamiliar = document.querySelector('.dentesPermanentesIndividualFamiliar');
const resultProtesesUnitariasIndividualFamiliar = document.querySelector('.protesesUnitariasIndividualFamiliar');
const resultRaspagemSupraIndividualFamiliar = document.querySelector('.raspagemSupraIndividualFamiliar');

//declarando campos para resultados CE
const resultVidasColetivoEmpresarial = document.querySelector('.vidasColetivoEmpresarial');
const resultConsultasIniciaisColetivoEmpresarial = document.querySelector('.consultasIniciaisColetivoEmpresarial');
const resultProcedimentosPreventivosColetivoEmpresarial = document.querySelector('.procedimentosPreventivosColetivoEmpresarial');
const resultEndoConclDentesPColetivoEmpresarial = document.querySelector('.dentesPermanentesColetivoEmpresarial');
const resultDentesPermanentesColetivoEmpresarial = document.querySelector('.dentesPermanentesColetivoEmpresarial');
const resultProtesesUnitariasColetivoEmpresarial = document.querySelector('.protesesUnitariasColetivoEmpresarial');
const resultRaspagemSupraColetivoEmpresarial = document.querySelector('.raspagemSupraColetivoEmpresarial');

//declarando campos para resultados CA
const resultVidasColetivoAdesao = document.querySelector('.vidasColetivoAdesao');
const resultConsultasIniciaisColetivoAdesao = document.querySelector('.consultasIniciaisColetivoAdesao');
const resultProcedimentosPreventivosColetivoAdesao = document.querySelector('.procedimentosPreventivosColetivoAdesao');
const resultEndoConclDentesPColetivoAdesao = document.querySelector('.dentesPermanentesColetivoAdesao');
const resultDentesPermanentesColetivoAdesao = document.querySelector('.dentesPermanentesColetivoAdesao');
const resultProtesesUnitariasColetivoAdesao = document.querySelector('.protesesUnitariasColetivoAdesao');
const resultRaspagemSupraColetivoAdesao = document.querySelector('.raspagemSupraColetivoAdesao');

//oculta a div de resultados inicialmente
resultDiv.style.display = 'none';

//ao enviar o arquivo, este bloco é executado
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(contents, 'application/xml');

        //segregando tipos de contratação
        const individualFamiliar = xmlDoc.getElementsByTagName('individualFamiliar');
        const coletivoEmpresarial = xmlDoc.getElementsByTagName('coletivoEmpresarial');
        const coletivoAdesao = xmlDoc.getElementsByTagName('coletivoAdesao');

        //segregando tags para calcular totais
        const tagsConsInic = xmlDoc.getElementsByTagName('consultasOdontoInic');
        const tagsProcPrevent = xmlDoc.getElementsByTagName('procedimentosPrevent');
        const tagsEndoConclDentesP = xmlDoc.getElementsByTagName('trataEndoConclDentesP');
        const tagsProtesesUnitarias = xmlDoc.getElementsByTagName('protesesOdontoUnitarias');
        const tagsRaspSupraGengHemi = xmlDoc.getElementsByTagName('raspSupraGengHemi');
        const ProcOdontoTags = xmlDoc.getElementsByTagName('procedimentosOdonto');
        const ufs = xmlDoc.getElementsByTagName('uf');

        const uniqueBeneficiariosGP1 = new Set();
        const uniqueBeneficiariosGP2 = new Set();
        let ufsArr = [];


        //declarando totais
        let totalConsInic = 0;
        let totalProcPrevent = 0;
        let totalEndoConclDentesP = 0;
        let totalProtesesUnitarias = 0;
        let totalRaspSupraGengHemi = 0;
        let totalVidasAtivasGP1 = 0;
        let totalVidasAtivasGP2 = 0;

        for (let i = 0; i < ufs.length; i++) {
            const uf = ufs[i].textContent;
                ufsArr.push(uf);

        }
           
        //iterando para calcular valores totais
        for (let i = 0; i < tagsConsInic.length; i++) {
            const eventos = tagsConsInic[i].querySelector('eventos');
            if (eventos) {
                totalConsInic += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProcPrevent.length; i++) {
            const eventos = tagsProcPrevent[i].querySelector('eventos');
            if (eventos) {
                totalProcPrevent += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsEndoConclDentesP.length; i++) {
            const eventos = tagsEndoConclDentesP[i].querySelector('eventos');
            if (eventos) {
                totalEndoConclDentesP += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProtesesUnitarias.length; i++) {
            const eventos = tagsProtesesUnitarias[i].querySelector('eventos');
            if (eventos) {
                totalProtesesUnitarias += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsRaspSupraGengHemi.length; i++) {
            const eventos = tagsRaspSupraGengHemi[i].querySelector('eventos');
            if (eventos) {
                totalRaspSupraGengHemi += parseInt(eventos.textContent);
            }
        }

        //iterando para calcular total de vidas ativas
        for (let i = 1; i < tagsRaspSupraGengHemi.length; i++) {
            const eventos = tagsRaspSupraGengHemi[i].querySelector('beneficiarios');
            if (eventos) {
                const valor = parseInt(eventos.textContent);
                if (!uniqueBeneficiariosGP2.has(valor)) {
                    uniqueBeneficiariosGP2.add(valor);
                    totalVidasAtivasGP2 += valor;
                }
            }
        }

        for (let i = 1; i < ProcOdontoTags.length; i++) {
            const eventos = ProcOdontoTags[i].querySelector('beneficiarios');
            if (eventos) {
                const valor = parseInt(eventos.textContent);
                if (!uniqueBeneficiariosGP1.has(valor)) {
                    uniqueBeneficiariosGP1.add(valor);
                    totalVidasAtivasGP1 += valor;
                }
            }
        }

        console.log(ufsArr);


        //imprimindo totais
        resultVidasAtivasGP2.textContent = totalVidasAtivasGP2;
        resultVidasAtivasGP1.textContent = totalVidasAtivasGP1;
        resultConsInic.textContent = totalConsInic;
        resultProcPrevent.textContent = totalProcPrevent;
        resultEndoConclDentesP.textContent = totalEndoConclDentesP;
        resultProtesesUnitarias.textContent = totalProtesesUnitarias;
        resultRaspSupraGengHemi.textContent = totalRaspSupraGengHemi;

        //individual familiar

        //segregando tags para calcular totais
        const tagsConsInicIF = individualFamiliar[0].querySelectorAll('consultasOdontoInic');
        const tagsProcPreventIF = individualFamiliar[0].querySelectorAll('procedimentosPrevent');
        const tagsEndoConclDentesPIF = individualFamiliar[0].querySelectorAll('trataEndoConclDentesP');
        const tagsProtesesUnitariasIF = individualFamiliar[0].querySelectorAll('protesesOdontoUnitarias');
        const tagsRaspSupraGengHemiIF = individualFamiliar[0].querySelectorAll('raspSupraGengHemi');
        const vidasIndividualFamiliar = individualFamiliar[0].querySelector('beneficiarios');

        //declarando totais IF
        let totalConsInicIF = 0;
        let totalProcPreventIF = 0;
        let totalEndoConclDentesPIF = 0;
        let totalProtesesUnitariasIF = 0;
        let totalRaspSupraGengHemiIF = 0;

        //iterando para calcular valores totais IF
        for (let i = 0; i < tagsConsInicIF.length; i++) {
            const eventos = tagsConsInicIF[i].querySelector('eventos');
            if (eventos) {
                totalConsInicIF += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProcPreventIF.length; i++) {
            const eventos = tagsProcPreventIF[i].querySelector('eventos');
            if (eventos) {
                totalProcPreventIF += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsEndoConclDentesPIF.length; i++) {
            const eventos = tagsEndoConclDentesPIF[i].querySelector('eventos');
            if (eventos) {
                totalEndoConclDentesPIF += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProtesesUnitariasIF.length; i++) {
            const eventos = tagsProtesesUnitariasIF[i].querySelector('eventos');
            if (eventos) {
                totalProtesesUnitariasIF += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsRaspSupraGengHemiIF.length; i++) {
            const eventos = tagsRaspSupraGengHemiIF[i].querySelector('eventos');
            if (eventos) {
                totalRaspSupraGengHemiIF += parseInt(eventos.textContent);
            }
        }

        //imprimindo totais IF
        resultVidasIndividualFamiliar.textContent = vidasIndividualFamiliar.textContent;
        resultConsultasIniciaisIndividualFamiliar.textContent = totalConsInicIF;
        resultProcedimentosPreventivosIndividualFamiliar.textContent = totalProcPreventIF;
        resultEndoConclDentesPIndividualFamiliar.textContent = totalEndoConclDentesPIF;
        resultProtesesUnitariasIndividualFamiliar.textContent = totalProtesesUnitariasIF;
        resultRaspagemSupraIndividualFamiliar.textContent = totalRaspSupraGengHemiIF;

        //coletivo empresarial

        //segregando tags para calcular totais CE
        const tagsConsInicCE = coletivoEmpresarial[0].querySelectorAll('consultasOdontoInic');
        const tagsProcPreventCE = coletivoEmpresarial[0].querySelectorAll('procedimentosPrevent');
        const tagsEndoConclDentesPCE = coletivoEmpresarial[0].querySelectorAll('trataEndoConclDentesP');
        const tagsProtesesUnitariasCE = coletivoEmpresarial[0].querySelectorAll('protesesOdontoUnitarias');
        const tagsRaspSupraGengHemiCE = coletivoEmpresarial[0].querySelectorAll('raspSupraGengHemi');
        const vidasColetivoEmpresarial = coletivoEmpresarial[0].querySelector('beneficiarios');

        //declarando totais CE
        let totalConsInicCE = 0;
        let totalProcPreventCE = 0;
        let totalEndoConclDentesPCE = 0;
        let totalProtesesUnitariasCE = 0;
        let totalRaspSupraGengHemiCE = 0;

        //iterando para calcular valores totais CE
        for (let i = 0; i < tagsConsInicCE.length; i++) {
            const eventos = tagsConsInicCE[i].querySelector('eventos');
            if (eventos) {
                totalConsInicCE += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProcPreventCE.length; i++) {
            const eventos = tagsProcPreventCE[i].querySelector('eventos');
            if (eventos) {
                totalProcPreventCE += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsEndoConclDentesPCE.length; i++) {
            const eventos = tagsEndoConclDentesPCE[i].querySelector('eventos');
            if (eventos) {
                totalEndoConclDentesPCE += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProtesesUnitariasCE.length; i++) {
            const eventos = tagsProtesesUnitariasCE[i].querySelector('eventos');
            if (eventos) {
                totalProtesesUnitariasCE += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsRaspSupraGengHemiCE.length; i++) {
            const eventos = tagsRaspSupraGengHemiCE[i].querySelector('eventos');
            if (eventos) {
                totalRaspSupraGengHemiCE += parseInt(eventos.textContent);
            }
        }

        //imprimindo totais CE
        resultVidasColetivoEmpresarial.textContent = vidasColetivoEmpresarial.textContent;
        resultConsultasIniciaisColetivoEmpresarial.textContent = totalConsInicCE;
        resultProcedimentosPreventivosColetivoEmpresarial.textContent = totalProcPreventCE;
        resultEndoConclDentesPColetivoEmpresarial.textContent = totalEndoConclDentesPCE;
        resultProtesesUnitariasColetivoEmpresarial.textContent = totalProtesesUnitariasCE;
        resultRaspagemSupraColetivoEmpresarial.textContent = totalRaspSupraGengHemiCE;

        //Coletivo por Adesão

        //segregando tags para calcular totais CA
        const tagsConsInicCA = coletivoAdesao[0].querySelectorAll('consultasOdontoInic');
        const tagsProcPreventCA = coletivoAdesao[0].querySelectorAll('procedimentosPrevent');
        const tagsEndoConclDentesPCA = coletivoAdesao[0].querySelectorAll('trataEndoConclDentesP');
        const tagsProtesesUnitariasCA = coletivoAdesao[0].querySelectorAll('protesesOdontoUnitarias');
        const tagsRaspSupraGengHemiCA = coletivoAdesao[0].querySelectorAll('raspSupraGengHemi');
        const vidasColetivoAdesao = coletivoAdesao[0].querySelector('beneficiarios');

        //declarando totais CA
        let totalConsInicCA = 0;
        let totalProcPreventCA = 0;
        let totalEndoConclDentesPCA = 0;
        let totalProtesesUnitariasCA = 0;
        let totalRaspSupraGengHemiCA = 0;

        //iterando para calcular valores totais CA
        for (let i = 0; i < tagsConsInicCA.length; i++) {
            const eventos = tagsConsInicCA[i].querySelector('eventos');
            if (eventos) {
                totalConsInicCA += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProcPreventCA.length; i++) {
            const eventos = tagsProcPreventCA[i].querySelector('eventos');
            if (eventos) {
                totalProcPreventCA += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsEndoConclDentesPCA.length; i++) {
            const eventos = tagsEndoConclDentesPCA[i].querySelector('eventos');
            if (eventos) {
                totalEndoConclDentesPCA += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsProtesesUnitariasCA.length; i++) {
            const eventos = tagsProtesesUnitariasCA[i].querySelector('eventos');
            if (eventos) {
                totalProtesesUnitariasCA += parseInt(eventos.textContent);
            }
        }

        for (let i = 0; i < tagsRaspSupraGengHemiCA.length; i++) {
            const eventos = tagsRaspSupraGengHemiCA[i].querySelector('eventos');
            if (eventos) {
                totalRaspSupraGengHemiCA += parseInt(eventos.textContent);
            }
        }

        //imprimindo totais CA
        resultVidasColetivoAdesao.textContent = vidasColetivoAdesao.textContent;
        resultConsultasIniciaisColetivoAdesao.textContent = totalConsInicCA;
        resultProcedimentosPreventivosColetivoAdesao.textContent = totalProcPreventCA;
        resultEndoConclDentesPColetivoAdesao.textContent = totalEndoConclDentesPCA;
        resultProtesesUnitariasColetivoAdesao.textContent = totalProtesesUnitariasCA;
        resultRaspagemSupraColetivoAdesao.textContent = totalRaspSupraGengHemiCA;

        resultDiv.style.display = 'block';
    };

    reader.readAsText(file); // Inicia a leitura do arquivo
})

