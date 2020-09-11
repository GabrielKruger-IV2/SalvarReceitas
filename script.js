var contIngred = 1
var contTxt = 1
var div = $("<div>").attr("id", "divI" + contIngred).attr("class", "divInterna")
var iIngred = $("<input>").attr("type", "text").attr("id", "iIngred" + contIngred)
var lIngred = $("<label>").text("Ingrediente").append(iIngred).attr("for", "iIngred" + contIngred).attr("class", "texto")
var iQtd = $("<input>").attr("type", "text").attr("id", "iQtd" + contIngred)
var lQtd = $("<label>").text("Quantidade").append(iQtd).attr("for", "iQtd" + contIngred).attr("class", "texto")
div.append(lIngred).append(lQtd)
$("#divInputsIngred").append(div)

var divT = $("<div>").attr("id", "divT" + contTxt)
var txtP = $("<p>").attr("id", "p" + contTxt).text("Passo 1")
var textA = $("<textarea>").attr("id", "txt" + contTxt)
var btnB = $("<button>").text("↓").attr("id", "descer " + contTxt).attr("onclick", `descer(${contTxt})`)


divT.append(txtP).append(textA).append(btnB)
$("#idDivTextPasso").append(divT)




$("#btnIngred").click(function () {

    contIngred++
    var div = $("<div>").attr("id", "divI" + contIngred).attr("class", "divInterna")
    var iIngred = $("<input>").attr("type", "text").attr("id", "iIngred" + contIngred)
    var lIngred = $("<label>").text("Ingrediente").append(iIngred).attr("for", "iIngred" + contIngred).attr("class", "texto")
    var iQtd = $("<input>").attr("type", "text").attr("id", "iQtd" + contIngred)
    var lQtd = $("<label>").text("Quantidade").append(iQtd).attr("for", "iQtd" + contIngred).attr("class", "texto")
    var btnR = $("<button>").attr("id", "remover" + contIngred).text("Remover")
    btnR.click(function () {
        $(this).parent().remove()
    })
    div.append(lIngred).append(lQtd).append(btnR)
    $("#divInputsIngred").append(div)
})



$("#btnTxt").click(function () {
    contTxt++
    if ($(`#p${contTxt}`))
        var divT = $("<div>").attr("id", "divT" + contTxt)
    var txtP = $("<p>").attr("id", "p" + contTxt).text(`Passo ${contTxt}`).attr("class", "texto")
    var textA = $("<textarea>").attr("id", "txt" + contTxt)
    var btnR = $("<button>").text("Remover").attr("id", "remover" + contTxt)
    var btnC = $("<button>").text("↑").attr("id", "subir" + contTxt).attr("onclick", `subir(${contTxt})`)
    var btnB = $("<button>").text("↓").attr("id", "descer" + contTxt).attr("onclick", `descer(${contTxt})`)

    btnR.click(function () {
        $(this).parent().remove()
        organiza()
    })

    divT.append(txtP).append(textA).append(btnB).append(btnC).append(btnR)
    $("#idDivTextPasso").append(divT)
})


function organiza() {

    var divs = $('[id^="divT"]').toArray()
    var txt = $('[id^="txt"]').toArray()
    var desc = $('[id^="descer"]').toArray()
    console.log(desc)
    var sub = $('[id^="subir"]').toArray()
    console.log(sub)

    for (var i = 0; i < divs.length; i++) {

        $(divs[i]).attr('id', 'divT' + (i + 1)).find(`p`).text('Passo ' + (i + 1))
        $(txt[i]).attr('id', 'txt' + (i + 1))
        $(desc[i]).attr('id', 'descer' + (i + 1)).attr("onclick", `descer(${i+1})`)

    }   
    for (i = 0; i < sub.length; i++) {
        $(sub[i]).attr('id', 'subir' + (i + 2)).attr("onclick", `subir(${i+2})`)
    }

    contTxt = divs.length

}

$("#btnSalvar").click(function () {
    var titulo = $("#iNome").val()
    var arrIngred = []

    var arrTxt = []

    var tIngred = $('[id^=iIngred]').toArray()
    var tQtd = $('[id^=iQtd]').toArray()
    var tTxt = $('[id^=txt').toArray()

    for (i = 0; i < tIngred.length; i++) {
        arrIngred.push($(tIngred[i]).val() + " " + $(tQtd[i]).val() + "\r\n")
    }
    for (i = 0; i < tTxt.length; i++) {
        arrTxt.push(tTxt[i].value)
    }
    
        var conteudo = "ingredientes \r\n \r\n" + arrIngred + "\r\n" + "Modo de Preparo" + "\r\n\r\n" + arrTxt
        console.log(conteudo)
    
        var blob = new Blob([conteudo], { type: "text/plain" })
    
        download(blob, titulo + ".txt")
    

})

function subir(n) {
    var txt1 = $(`#txt${n}`).val()
    var txt2 = $(`#txt${n-1}`).val()
    var temp = ""
    temp = txt1
    txt1 = txt2
    txt2 = temp
    $(`#txt${n}`).val(txt1)
    $(`#txt${n-1}`).val(txt2)
}

function descer(n) {
    if (contTxt == n) {

    } else {
        var txt1 = $(`#txt${n}`).val()
        var txt2 = $(`#txt${n+1}`).val()
        var temp = ""
        temp = txt1
        txt1 = txt2
        txt2 = temp
        $(`#txt${n}`).val(txt1)
        $(`#txt${n+1}`).val(txt2)
    }
}

function download(blob, nome) {
    const dwl = document.createElement("a");
    dwl.href = URL.createObjectURL(blob);
    dwl.download = nome;

    document.body.appendChild(dwl);
    dwl.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    document.body.removeChild(dwl);
}