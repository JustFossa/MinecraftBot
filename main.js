var mineflayer = require('mineflayer');
var D = require('discord.js');
var client = new D.Client();
var config = require('./config.json');
var chalk = require('chalk');
var jc = config.jc
const mineflayerViewer = require('prismarine-viewer').mineflayer
let prefix = config.prefix;
let color = "RANDOM";
let ip = config.ip;
let username = config.username;
let ver = config.version
var bot
const exec = require('child_process').exec;
const mineflayer_gui = require(`mineflayer-gui`);
if (config.password == "false") {
  bot = mineflayer.createBot({
    host: ip,
    username: username,
    version: ver
  })
} else {
let pass = config.password;

  bot = mineflayer.createBot({
    host: ip,
    username: username,
    password: pass,
    version: ver
  })
}

/*exec('node server.js 8000 dev',
   (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
           console.log(`exec error: ${error}`);
      }
 });
 */

 
// =========================
// SET ACTIVITY BOT
// =========================
client.on('ready', activity => {
  client.user.setStatus(`online`)
  bot.loadPlugin(mineflayer_gui)
  client.user.setActivity(
    `${ip} Servers Chat, | For Help Do  ${prefix}help `, {
      type: "WATCHING"
    }
  )
});

client.on('ready', async () => {
  console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log(chalk.magenta(`Discord Bot on. Loggined as ${client.user.tag}`))
  console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log();
})
bot.on('login', async () => {
  console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log(chalk.magenta(`bot is on At ${ip}`))
  bot.chat(jc)
  console.log(chalk.yellow(`Bot just say "${jc}"`))
  console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
  console.log();
})

bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3000 }) // Start the viewing server on port 3000

  // Draw the path followed by the bot
  const path = [bot.entity.position.clone()]
  bot.on('move', () => {
    if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
      path.push(bot.entity.position.clone())
      bot.viewer.drawLine('path', path)
    }
  })
})



client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return
  let args = msg.content.split(" ").slice(1)
  args = msg.content.slice(prefix.length).split(/ +/);
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  command = args.shift().toLowerCase();

  if (command == "sudo") {
    const chat = args.join(" ")
    bot.chat(chat)
    const success = new D.MessageEmbed()
      .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${chat}\``)
      .setColor(color)
    msg.channel.send(success)
  } else if (command == "forward") {
    bot.setControlState('forward', true)
    const MoForw = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving forward To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoForw)
  } else if (command == "backward") {
    bot.setControlState('back', true)
    const MoBackw = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving backward To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoBackw)
  } else if (command == "stop") {
    bot.clearControlStates()
    const MoStop = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Stopped!`)
      .setColor(color)
    msg.channel.send(MoStop)
  } else if (command == "left") {
    bot.setControlState('left', true)
    const MoLeft = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving left To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoLeft)
  } else if (command == "right") {
    bot.setControlState('right', true)
    const MoRight = new D.MessageEmbed()
      .setDescription(`:white_check_mark: Im Moving Right To Stop Do -stop`)
      .setColor(color)
    msg.channel.send(MoRight)
  } else if (command == "help") {
    const help = new D.MessageEmbed()
      .setTitle(`Help`)
      .addField(` ${prefix}sudo (Chat) `, 'To Get The bot say what you want')
      .addField(` ${prefix}movement `, 'Look At Movement command')
      .setColor(color)
    msg.channel.send(help)
  } else if (command == "movement") {
    const movement = new D.MessageEmbed()
      .setTitle(`Movement Command`)
      .addField(` ${prefix}forward `, 'To Move Forward')
      .addField(` ${prefix}backward `, 'To Move Backward')
      .addField(` ${prefix}left `, 'To Move Left')
      .addField(` ${prefix}right `, 'To Move Right')
      .addField(` ${prefix}stop `, 'To Stop')
      .setColor(color)
    msg.channel.send(movement)
  } else if (command == "delmsg") {
    msg.channel.bulkDelete(100)
  }


})

bot.on("messagestr", message => {
  let channel = client.channels.cache.get(config.scid)
  if (!channel) return;
  channel.send(`${message}`)
})

client.login(config.Dtoken)
  .catch(error => {
    console.log(`cant login`);
  })
