function createAndAppendElement(tag, classes = [], textContent = '') {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = textContent;
    return element;
}

function generateSupplierField(currentSupplier) {
    const panelElement = document.getElementById('Panel');
    const whitePanel = createAndAppendElement('div', ['white-panel']);
    
    const divSupplierField = createAndAppendElement('div', ['supplierField', 'button']);
    divSupplierField.appendChild(createAndAppendElement('p', ['serviceType'], currentSupplier.SERVICO_OU_PRODUTO.toUpperCase()));

    const nameElement = createAndAppendElement('p', ['name']);
    nameElement.textContent = currentSupplier.RAZAO_SOCIAL.length < 2 ? currentSupplier.NOME_FANTASIA.toUpperCase() : currentSupplier.RAZAO_SOCIAL.toUpperCase();
    divSupplierField.appendChild(nameElement);

    const cnpjElement = createAndAppendElement('p', ['cnpj']);
    cnpjElement.textContent = currentSupplier.CNPJ;
    divSupplierField.appendChild(cnpjElement);

    const showMoreButton = createAndAppendElement('button', ['arrow-button']);
    divSupplierField.appendChild(showMoreButton);
    
    const detailsPanel = createAndAppendElement('div', ['details-panel']);
    panelElement.appendChild(divSupplierField);
    panelElement.appendChild(detailsPanel);
    document.body.appendChild(whitePanel);

    let isDetailsVisible = false;

    showMoreButton.addEventListener('click', () => {
        if (isDetailsVisible) {
            detailsPanel.innerHTML = '';
            detailsPanel.style.display = 'none';
            isDetailsVisible = false;
        } else {
            for (let field in currentSupplier) {
                if (field !== "PORTIFÓLIO") {
                    const detailWrapper = createAndAppendElement('div', ['detail-wrapper']);
    
                    const fieldElement = createAndAppendElement('p', ['field'], `${field.replace(/_/g, ' ')}:`);
                    detailWrapper.appendChild(fieldElement);
    
                    let value = currentSupplier[field].replace(/_/g, ' ');
                    if (field === "EMAIL") {
                        value = value.toLowerCase(); // Convertendo para minúsculas
                    }
                    const valueElement = createAndAppendElement('p', ['value'], value);
                    detailWrapper.appendChild(valueElement);
    
                    detailsPanel.appendChild(detailWrapper);
                }
            }
            detailsPanel.style.display = 'grid';
            isDetailsVisible = true;
        }
    });
}

export default generateSupplierField;