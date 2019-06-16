$(function(){
  var ultimoClick;

  function onTarefaDeleteClick() {
    $(this).parent(".tarefa-item")
      .unbind('click')
      .hide('slow', function() {
        $(this).remove();
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
    var texto = el.children(".tarefa-edit").val();
    el.empty();
    el.append("<div class='tarefa-texto'>"+texto+"</div>")
      .append("<div class='tarefa-delete'></div>")
      .append("<div class='clear'></div>");

    $(".tarefa-delete").click(onTarefaDeleteClick);

    el.click(onTarefaItemClick);
  }

  function onTarefaEditKeydown(event) {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      salvarEdicaoPendente(ultimoClick);
      ultimoClick = undefined;
    }
  }

  function onTarefaKeydown(event) {
    if (event.keyCode === 13) {
      addTarefa($("#tarefa").val());
      $("#tarefa").val("");
    }
  }

  function addTarefa(text) {
    var tarefa = $("<div />")
                  .addClass("tarefa-item")
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
});