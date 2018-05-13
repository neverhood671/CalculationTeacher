const minA = 6,
    maxA = 9,
    minResult = 11,
    maxResult = 14;

var isQuestionResolved;

function resetTask() {
    isQuestionResolved = false;

    var firstArg = Math.floor(Math.random() * (maxA - minA + 1)) + minA,
        result = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult,
        secondArg = result - firstArg;

    createQuestion(firstArg, secondArg, result);
    addArrow(0, firstArg, 1);
    addArrow(firstArg, result, 2);
    showArrow(1);
}

function createQuestion(firstArgValue, secondArgValue, resultValue) {

    var firstArg = createArg(firstArgValue, 1)[0],
        secondArg = createArg(secondArgValue, 2)[0],
        result = createInput(resultValue, 'result')[0];

    $(result)
        .val('?')
        .attr('readonly', 'readonly')
        .addClass('result_input');

    $('.question_block').append(firstArg);
    $('.question_block').append(document.createTextNode(' + '));
    $('.question_block').append(secondArg);
    $('.question_block').append(document.createTextNode(' = '));
    $('.question_block').append(result);
}

function createArg(value, index) {
    return $('<span>')
        .html(value)
        .attr('id', 'arg' + index)
        .attr('data-value', value);
}

function createInput(correctValue, inputId) {
    return $('<input>', {
        'id': inputId,
        'class': 'input_field',
        'data-correct-value': correctValue,
        on: {
            'blur': inputEventListener,
            'keydown': event => {
                if (event.keyCode === 13) inputEventListener(event);
            },
            'input': event => {
                $(event.target).removeClass('input_error');
                if ($('.error_arg') != null)
                    $('.error_arg').removeClass('error_arg');
            }
        }
    });
}

function inputEventListener(event) {
    if (event.target.value != event.target.dataset.correctValue) {
        $(event.target).addClass('input_error');
        var inputIndex = Number(event.target.id.slice(-1));
        if (!isNaN(inputIndex)) {
            $('#arg' + inputIndex).addClass('error_arg');
        }
    } else {
        $(event.target).attr('readonly', 'readonly');
        switch (event.target.id) {
            case 'input1':
                showArrow(2);
                break;
            case 'input2':
                $('#result').removeAttr('readonly');;
                break;
            case 'result':
                if (!isQuestionResolved) alert('Задание выполнено! Молодец!');
                isQuestionResolved = true;
                break;
        }
    }
}


function addArrow(startNumber, targetNumber, arrowIndex) {

    var oneStepOnRuleSize = $('#axis_img').width() / 22.5, //this is a magic number - this is just an approximate number of divisions in the ruler
        arrowWidth = oneStepOnRuleSize * (targetNumber - startNumber);

    $('<div>', {
        'id': 'arrow' + arrowIndex,
        'class': 'arrow_block arrow_block_hidden',
        'append': $('<div>', {
            'class': 'arrow',
            'css': {
                'width': arrowWidth + 'px',
                'height': (arrowWidth / 4) + 'px'
            }
        })
    }).appendTo($('.input_block'));

    var input = createInput(targetNumber - startNumber, 'input' + arrowIndex);
    $(input).prependTo('#arrow' + arrowIndex);

    $('.input_block').attr("style", "transform: translate(" + (oneStepOnRuleSize - 2) + "px," + (oneStepOnRuleSize / 2) + "px)");
}

function showArrow(index) {
    $('#arrow' + index).removeClass('arrow_block_hidden');
}

resetTask();
