document.getElementById("addPaymentButton").addEventListener("click", function () {
    const dynamicFields = document.getElementById("dynamicFields");

    // Novo conjunto de campos
    const newFields = document.createElement("div");
    newFields.className = "d-flex mb-3 dynamic-field";

    newFields.innerHTML = `
<div class="col-md-5 me-1 text-start">
    <label for="tipoPagamento" class="form-label">Tipo de pagamento</label>
    <select class="form-select" name="tipoPagamento">
        <option value="">Selecione</option>
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">Pix</option>
        <option value="debito">Cartão de Débito</option>
        <option value="credito">Cartão de Crédito</option>
    </select>
</div>
<div class="col-md-5 me-3 text-start">
    <label for="valorPagamento" class="form-label">Valor do pagamento</label>
    <input type="number" class="form-control" name="valorPagamento" placeholder="R$ 0,00">
</div>
<div class="col-md-2 d-flex align-items-end">
    <button type="button" class="btn btn-danger remove-field"><i class="fas fa-minus"></i></button>
</div>
`;

    dynamicFields.appendChild(newFields);

    newFields.querySelector(".remove-field").addEventListener("click", function () {
        dynamicFields.removeChild(newFields);
    });
});