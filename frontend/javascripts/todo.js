$(function(){
  var ultimoClick;

  function onTarefaDeleteClick() {
    $(this).parent(".tarefa-item")
      .unbind('click')
      .hide('slow', function() {
        $(this).remove();
      });

    var id = $(this).parent(".tarefa-item").attr('rel');
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:8000/todos/' + id,
    });
  }

  function onTarefaItemClick() {
    if (!$(this).is(ultimoClick)) {

      if (ultimoClick !== undefined) {
        salvarEdicaoPendente(ultimoClick);
      }

      ultimoClick = $(this);

      var texto = ultimoClick.children(".tarefa-texto").text();

      var input = "<input type='text' class='tarefa-edit'"+ 
                  " value='"+texto+"'>";
      
      ultimoClick.html(input);

      $(".tarefa-edit").keydown(onTarefaEditKeydown);
    }
  }

  function salvarEdicaoPendente(el) {
    var description = el.children(".tarefa-edit").val();
    var id = el.children(".tarefa-edit").parent(".tarefa-item").attr('rel');

    $.ajax({
      type: 'PUT',
      dataType: 'json',
      data: {"description": description},
      url: 'http://localhost:8000/todos/' + id
    });

    el.empty();
    el.append("<div class='tarefa-texto'>"+description+"</div>")
      .append("<div class='tarefa-delete'></div>")
      .append("<div class='clear'></div>");

    $(".tarefa-delete").click(onTarefaDeleteClick);

    el.click(onTarefaItemClick);
  }

  function onTarefaEditKeydown(event) {
    if (event.keyCode === 13) {
      salvarEdicaoPendente(ultimoClick);
      ultimoClick = undefined;
    }
  }

  function onTarefaKeydown(event) {
    var description = $("#tarefa").val()

    if (event.keyCode === 13 && description.length > 0) {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {"description": description},
        url: 'http://localhost:8000/todos',
        success: function(todo) {
          addTarefa(todo.id, todo.description);
          $("#tarefa").val("");
        }
      });
    }
  }

  function addTarefa(id, text) {
    var tarefa = $("<div />")
                  .addClass("tarefa-item")
                  .attr('rel', id)
                  .append($("<div />")
                    .addClass("tarefa-texto")
                    .text(text)
                  )
                  .append($("<div />")
                    .addClass("tarefa-delete")
                  )
                  .append($("<div />", {"class":"clear"})
                    //.addClass("clear")
                  );
    
    $("#tarefa-list").append(tarefa);

    $(".tarefa-delete").click(onTarefaDeleteClick);
    $(".tarefa-item").click(onTarefaItemClick);
  }

  $(".tarefa-delete").click(onTarefaDeleteClick);

  $(".tarefa-item").click(onTarefaItemClick);

  $("#tarefa").keydown(onTarefaKeydown);
  $("#tarefa").focus();

  $(document).ready(function() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'http://localhost:8000/todos',
      success: function(todos) {
        todos.forEach(todo => {
          addTarefa(todo.id, todo.description);
        });
      }
    });
  });
});