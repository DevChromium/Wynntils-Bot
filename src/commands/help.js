module.exports = {
    info: {
        name: 'Help',
        desc: 'Help command',
        help: 'help [command]',
        category: "General",
        uses: [
            'help',
            'commands'
        ]
    },
    execute: (bot, r, msg, args) => {
        var e = {
            embed: {
                author: {
                    name: 'Wynntils Help',
                    icon_url: msg.author.avatarURL
                },
                color: 7531934,
                fields: [],
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "Wynntils"
                }
            }
        };
        if (args.length === 0) {
            var categories = [];
            bot.commands.map(cmd => {
                if (cmd.info.category !== "Hidden") {
                    if (typeof categories[`**${cmd.info.category}**`] === "undefined") {
                        categories[`**${cmd.info.category}**`] =  ` \`${cmd.info.help.toLowerCase().split(' ')[0]}\` `;
                    } else {
                        categories[`**${cmd.info.category}**`] += ` \`${cmd.info.help.toLowerCase().split(' ')[0]}\` `;
                    }
                }
            });

            var helpMessage = " ";
            for (var x in categories) {
                helpMessage += `${x}\n${categories[x]}\n`;
            }
            helpMessage.replace("  ", ", ");

            e.embed.fields.push({
                name: "Categories",
                value: helpMessage
            });
        } else if (args.length === 1) {
            var found = false;
            bot.commands.map(cmd => {
                if (cmd.info.help.startsWith(args[0]) && !found) {
                    e.embed.fields.push({
                        name: `${bot.config.prefix}${cmd.info.help.toLowerCase()}`,
                        value: cmd.info.desc
                    });
                    found = true;
                }
            });
            if (!found) {
                e.embed.fields.push({
                    name: "Invalid Command",
                    value: `Could not find command - \`${args[0]}\`.`
                })
            }
        } else {
            e.embed.fields.push({
                name: "Invalid Usage",
                value: `Could not parse arguments correctly - \`${args.join(" ")}\`.`
            })
        }

        msg.channel.createMessage(e);
    }
};