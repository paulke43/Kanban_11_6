$(document).ready(function(){
    function randomString() { 
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'; 
        var str = ''; 
        for (i = 0; i < 10; i++) { 
                str += chars[Math.floor(Math.random() * chars.length)]; 
            } 
            return str; 
        }
    function Column(name) { 
        var self = this; 
        
        this.id = randomString(); 
        this.name = name; 
        this.$element = createColumn(); 
    
        function createColumn() { 
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column'); 
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name); 
            var $columnCardList = $('<ul>').addClass('column-card-list'); 
            var $columnDelete = $('<button>').addClass('btn-delete').text('x'); 
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

            // ADDING EVENTS
            $columnDelete.on("click", function() { 
                self.removeColumn(); 
            });
            $columnAddCard.on ("click", function() { 
                self.addCard(new Card(prompt("Wpisz nazwę karty"))); 
            });
        
            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle) 
                .append($columnDelete) 
                .append($columnAddCard) 
                .append($columnCardList);

            // RETURN OF CREATED COLUMN
            return $column;
        }
    }

    Column.prototype = { 
        addCard: function(card) { 
            this.$element.children('ul').append(card.$element); 
        }, 
        removeColumn: function() { 
            this.$element.remove(); 
        } 
    }; 

    function Card(description) { 
        var self = this; 

        this.id = randomString(); 
        this.description = description; 
        this.$element = createCard(); 

        function createCard() { 
            // CREATING THE BLOCKS
            var $card = $('<li>').addClass('card'); 
            var $cardDescription = 
                $('<p>').addClass('card-description').text(self.description); 
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            // BINDING TO CLICK EVENT
            $cardDelete.on("click", function() { 
                self.removeCard(); 
            });
            // COMBINING BLOCKS AND RETURN THE CARD
            $card.append($cardDelete) 
                    .append($cardDescription); 
            return $card;
        } 
    }

    Card.prototype = { 
        removeCard: function() { 
            this.$element.remove(); 
        } 
    };

    var board = { 
        name: 'Kanban Board', 
        addColumn: function(column) { 
            this.$element.append(column.$element); 
            initSortable();
        }, 
        $element: $('#board .column-container') 
    };
    

    function initSortable() { 
        $('.column-card-list').sortable({ 
            connectWith: '.column-card-list', 
            placeholder: 'card-placeholder' 
        }).disableSelection(); 
    }

    $('.create-column') 
        .on("click", function(){ 
            var name = prompt('Wpisz nazwę kolumny'); 
            var column = new Column(name); 
            board.addColumn(column); 
        });

    // CREATING COLUMN
    var todoColumn = new Column('Do zrobienia'); 
    var doingColumn = new Column('W trakcie'); 
    var doneColumn = new Column('Skończone'); 

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn); 
    board.addColumn(doingColumn); 
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('Nowe zadanie'); 
    var card2 = new Card('Stworzyć tablice kanban');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1); 
    doingColumn.addCard(card2);
});