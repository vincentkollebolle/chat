const port = '3000'
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
	}
});
var users = [];

// Quelqu'un rejoint le socket
io.on('connection', function(socket){
    console.log('User is connected');
    // On lui envoie les utilisateurs présents sur le chat
    io.emit('allUsers', users);
    // Il demande à rejoindre le chat avec un pseudo
    socket.on('newUser', function (pseudo){
      // On stock le pseudo sur la session du serveur
      socket.pseudo = pseudo;
      // On ajoute l'utilisateur à la liste des utilisateurs présents
      users.push(pseudo);
      // On envoie un message aux autres utilisateurs avec son pseudo
      io.emit('newUser', pseudo);
      // On met à jour la liste des utilisateurs présents pour tous le monde
      io.emit('allUsers', users);
    })
    // Il envoie un message
    socket.on('message', function (message) {
      // On envoie le message aux autres utilisateurs avec son pseudo récupéré dans la session du serveur
      io.emit('message', {pseudo: socket.pseudo, message: message});
    });
    // Il se deconnecte mais reste sur la page (socket toujours présent)
    socket.on('logout', function (message) {
      // On le supprime de la liste des utilisateurs
      users.pop(socket.pseudo);
      // On envoie un message aux autres utilisateurs pour prévenir la déconnexion
      io.emit('logout', {pseudo: socket.pseudo, message: message});
      // On mmet à jour la liste des utilisateurs présents pour tout le monde
      io.emit('allUsers', users);
    }); 
    // Il quitte le navigateur
    socket.on('disconnect', function(){
      console.log('User is disconnected');
      // On vérifie s'il a oublié de se deconnecter
      if (users.includes(socket.pseudo)){
        users.pop(socket.pseudo);
        io.emit('logout', {pseudo: socket.pseudo, message: 'Kenavo'});
        io.emit('allUsers', users);
      }
    });
  });

http.listen(port, function(){
    console.log('listening on port : '+ port);
});