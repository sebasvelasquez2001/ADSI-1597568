/*jslint browser: true*/
/*global $, jQuery, alert*/

// FUNCIONES FIJAS PREDEFINIDAS Y VARIABLES GLOBALES

var oper = "",
    memoria = "",
    acum = "";

function clear() {
    'use strict';
    var num = $("#txtNum");
    num.val("");
}

function clearMem() {
    'use strict';
    var num = $("#txtMem");
    num.val("");
}

function entero(valor) {
    'use strict';
    return (+valor >= 0 ? Math.floor(+valor) : Math.ceil(+valor));
}

function toM() {
    'use strict';
    var valor = $("#txtNum").val();
    $("#memory").text(valor);
}

function fromM() {
    'use strict';
    var valor = $("#memory").text();
    $("#txtNum").val(valor);
}

function addNum(digito) {
    'use strict';
    var num = $("#txtNum");
    if (oper === undefined) {
        clear();
        oper = "";
    }
    num.val(num.val() + digito);
}

function chgOper(operacion) {
    'use strict';
    oper = operacion;
    acum = $("#txtNum").val();
    clear();
}

function calcular() {
    'use strict';
    var total = 0,
        num = $("#txtNum"),
        valor = num.val();

    // Si no hay acumulado u operador, no se puede totalizar nada: Salgo
    if (acum === "" || oper === "" || isNaN(valor)) {
        return false;
    }

    // Si no hay valor, se escribió un número y pulsó un operador (ej: 2*=)
    if (valor === "") {
        valor = +acum;
    }

    if (oper === "X^Y") {
        total = Math.pow(+acum, +valor);
    } else {
        /*jslint evil: true */
        total = eval(acum + oper + valor);
    }

    num.val(total);
    oper = undefined;
}

// SUSCRIPCIÓN A EVENTOS UNA VEZ CARGADA LA PÁGINA

$(document).ready(function () {
    'use strict';

    // QUITAR EL EFECTO DE PRESIONADO UNA VEZ SE TOCA EL BOTON
    $(".btn").mouseup(function () {
        $(this).blur();
    });

    // DRAG AND DROP

    $("#pantalla").draggable({
        revert: true,
        opacity: 0.7,
        delay: 150,
        helper: "original",
        revertDuration: 250,
        scope: "default",
        start: function (event, ui) {
            $("#pant-handle").hide();
        },
        stop: function (event, ui) {
            $("#pant-handle").show();
        },
        zIndex: 99,
        distance: 1
    });

    $("#memoria").draggable({
        revert: true,
        opacity: 0.7,
        delay: 150,
        helper: "original",
        revertDuration: 250,
        scope: "default",
        start: function (event, ui) {
            $("#mem-handle").hide();
        },
        stop: function (event, ui) {
            $("#mem-handle").show();
        },
        zIndex: 99,
        distance: 1
    });

    $("#txtNum").droppable({
        addClasses: false,
        //activeClass: "ui-state-highlight2",
        hoverClass: "ui-state-hover2",
        greedy: true,
        tolerance: "pointer", // "intersect"
        drop: function (event, ui) {
            var valor = ui.draggable.find("#memory").text();
            $(this).val(valor);
        }
    });

    $("#memory").droppable({
        addClasses: false,
        //activeClass: "ui-state-highlight2",
        hoverClass: "ui-state-hover2",
        greedy: true,
        tolerance: "pointer", // "intersect"
        drop: function (event, ui) {
            var valor = ui.draggable.find("#txtNum").val();
            $(this).text(valor);
        }
    });


    // TECLADO NUMÉRICO ---------------------------------------------

    $("#btn1").on("click", function () {
        addNum("1");
    });

    $("#btn2").on("click", function () {
        addNum("2");
    });

    $("#btn3").on("click", function () {
        addNum("3");
    });

    $("#btn4").on("click", function () {
        addNum("4");
    });

    $("#btn5").on("click", function () {
        addNum("5");
    });

    $("#btn6").on("click", function () {
        addNum("6");
    });

    $("#btn7").on("click", function () {
        addNum("7");
    });

    $("#btn8").on("click", function () {
        addNum("8");
    });

    $("#btn9").on("click", function () {
        addNum("9");
    });

    $("#btn0").on("click", function () {
        addNum("0");
    });

    $("#btnDot").on("click", function () {
        addNum(".");
    });

    // OPERACIONES BINARIAS ---------------------------------------------

    $("#txtNum").on("click",
        function () {
            clear();
        }
    );

    $("#btnMas").on("click",
        function () {
            chgOper("+");
        }
    );

    $("#btnMenos").on("click",
        function () {
            chgOper("-");
        }
    );

    $("#btnMult").on("click",
        function () {
            chgOper("*");
        }
    );

    $("#btnDiv").on("click",
        function () {
            chgOper("/");
        }
    );

    $("#btnXeY").on("click",
        function () {
            chgOper("X^Y");
        }
    );

    // BOTONES DE MEMORIA ---------------------------------------------
    $("#btnToM").on("click",
        function () {
            toM();
        }
    );

    $("#btnFromM").on("click",
        function () {
            fromM();
        }
    );


    // OPERACIONES UNITARIAS ---------------------------------------------

    $("#btnCuad").on("click",
        function () {
            var num = $("#txtNum");
            num.val(+num.val() * +num.val());
            oper = undefined;
        }
    );

    $("#btn2eN").on("click",
        function () {
            chgOper("X^Y");
            $("#txtNum").val("2");
            calcular();
        }
    );

    $("#btnInvX").on("click",
        function () {
            var num = $("#txtNum");
            num.val(1 / num.val());
            oper = undefined;
        }
    );

    $("#btnSqrt").on("click",
        function () {
            var num = $("#txtNum");
            num.val(Math.sqrt(num.val()));
            oper = undefined;
        }
    );

    $("#btnPEnt").on("click",
        function () {
            var num = $("#txtNum");

            /*
            if (+num.val >= 0) {
                num.val(Math.floor(+num.val));
            } else {
                num.val(Math.ceil(+num.val));
            }*/
            num.val(entero(+num.val()));
            oper = undefined;
        }
    );

    $("#btnNFact").on("click",
        function () {
            var i = 0,
                num = $("#txtNum"),
                x = entero(+num.val());

            for (i = x - 1; i > 1; i -= 1) {
                x = (x * i);
            }
            num.val(x);
            oper = undefined;
        }
    );

    // OPERACIONES CON N OPERANDOS CSV ---------------------------------------------

    $("#btnCsvE").on("click",
        function () {
            var i = 0,
                x = 0,
                num = $("#txtNum"),
                a = num.val().replace(/([;])/g, ',').split(',');
            // El replace() anterior reemplaza los ";" por "," (si hay) para finalmente
            // retornar un array con los valores separados por ",", lo que permite usar
            // "," o ";" indistintamente.

            for (i = 0; i < a.length; i += 1) {
                x += (+a[i]);
            }
            num.val(x);
            oper = undefined;
        }
    );

    $("#btnCsvProd").on("click",
        function () {
            var i = 0,
                x = 1,
                num = $("#txtNum"),
                a = num.val().replace(/([;])/g, ',').split(',');
            // El replace() anterior reemplaza los ";" por "," (si hay) para finalmente
            // retornar un array con los valores separados por ",", lo que permite usar
            // "," o ";" indistintamente.
            for (i = 0; i < a.length; i += 1) {
                x = x * (+a[i]);
            }
            num.val(x);
            oper = undefined;
        }
    );


    // OPERACIONES CLS Y TOTAL ---------------------------------------------

    $("#btnCls").on("click",
        function () {
            clear();
            oper = undefined;
        }
    );

    $("#btnTot").on("click",
        function () {
            calcular();
        }
    );

});

/*
function mostrarMensaje(cMsj) {
    oMsj.innerHTML = cMsj;
}

function clear_msj() {
    mostrarMensaje("");
}
*/