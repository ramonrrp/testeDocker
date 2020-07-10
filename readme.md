https://www.youtube.com/watch?v=Kzcz-EVKBEQ

##############################
#Canal: programador a bordo ##################
#APP com 3 containers usando php mysql e node#
#dockerfile, dockerexec#######################
########################

#############################################################################################
primeiro processo é o de buildar uma imagem baixada do hub docker			       #
a partir de um dockerfile que passa as variáveis de ambiente necessárias para a configuração#
#############################################################################################

ramonrrp@notecasa:~/docker/prog a bordo$ sudo docker build -t mysql-image -f api/db/dockerfile .
  docker build   --> builda a imagem doquer 
  -t mysql-image --> especifica o nome para a imagem
  -f             --> contexto de execução

#######################################################################################
depois, é criado um script sql para adição de um banco com tabelas e valores para teste 
[/api/db/script.sql]
#######################################################################################

  
ramonrrp@notecasa:~/docker/prog a bordo$ sudo docker run -d --rm --name mysql-container mysql-image
  -d          --> detach
  --rm        --> se o container já existe, remove para recriar
  --name      --> nome que o container vai usar
  mysql-image --> nome da imagem que gera o container
  
  
#######################################################################################
  É então é executado o comando para implementar o script no banco:
#######################################################################################

ramonrrp@notecasa:~/docker/prog a bordo/api/db$ sudo docker exec -i mysql-container mysql -uroot -pramonrrp < api/db/script.sql 
  -i --> informa que o docker vai aguardar a finalização da execução do fluxo
  mysql-container --> nome do container que está rodando que receberá a execução
  
  
#######################################################################################
Como se trata de um banco de dados, é necessário persistir o conteúdo, então é criado um
volume mapeado na máquina host
#######################################################################################  

ramonrrp@notecasa:~/docker/prog a bordo$ sudo docker run -d -v /api/db/data:/var/lib/mysql --rm --name mysql-container mysql-image
  -v /api/db/data:/var/lib/mysql - cria volume no caminho /api/db/data do host para /var/lib/mysql do container


################################
################################
################################
################################
buildar as imagens:
mysql      : docker run passa tudo que precisa
node e php : necessário buildar as imagens


subir as aplicações

#sudo docker run -d -v /home/ramonrrp/docker/progABordo/api/db/data:/var/lib/mysql -v /home/ramonrrp/docker/progABordo/api/db/dump:/docker-entrypoint-initdb.d -e MYSQL_DATABASE=programadorabordo -e MYSQL_ROOT_PASSWORD=ramonrrp -e MYSQL_USER=ramonrrp -e MYSQL_PASSWORD=ramonrrp --rm --name mysql-container mysql:5.7.30
#sudo docker run -d -v /home/ramonrrp/docker/progABordo/api:/home/node/app -p 9001:9001 --link mysql-container --rm --name node-container node-image
#sudo docker run -d -v /home/ramonrrp/docker/progABordo/website:/var/www/html --rm -p 8888:80 --link node-container --name php-container php-image

COMANDÃO QUE SOBE O AMBIENTE:

sudo docker run -d -v /home/ramonrrp/docker/progABordo/api/db/data:/var/lib/mysql -v /home/ramonrrp/docker/progABordo/api/db/dump:/docker-entrypoint-initdb.d -e MYSQL_DATABASE=programadorabordo -e MYSQL_ROOT_PASSWORD=ramonrrp -e MYSQL_USER=ramonrrp -e MYSQL_PASSWORD=ramonrrp --rm --name mysql-container mysql:5.7.30 && docker run -d -v /home/ramonrrp/docker/progABordo/api:/home/node/app -p 9001:9001 --link mysql-container --rm --name node-container node-image && sudo docker run -d -v /home/ramonrrp/docker/progABordo/website:/var/www/html --rm -p 8888:80 --link node-container --name php-container php-image









