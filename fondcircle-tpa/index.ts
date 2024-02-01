import { ActorCommandSelector, PlayerCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { events } from "bdsx/event";

events.serverOpen.on(() => {

    const tpalist = new Map<string, any>;


    command.register("tpa", "tp 요청을 보냅니다!").overload(
        (param, origin) =>  {
            if (param.players) {
                for (const player2 of param.players.newResults(origin)) {
                    const player1 = origin.getEntity()
                    if (player1?.isPlayer()) {
                        if(!tpalist.get(player2.getName())) {
                            const nowtime = new Date()
                            tpalist.set(player2.getName(), {
                                pos : player2.getFeetPos(),
                                time : nowtime,
                                target : player1,
                            })
                            player1.sendMessage(`§l§e${"=".repeat(30)}\n§f${player1.getNameTag()}님에게 tp요청을 보냈습니다. 30초뒤에 다시 보낼수 있습니다.\n§e${"=".repeat(30)}`)                            
                            player2.sendMessage(`§l§e${"=".repeat(30)}\n§f${player1.getNameTag()}님이 지금 위치로 tp요청을 보냈습니다.\n§e'/tpaccept'§f로 수락할수 있습니다\n§e${"=".repeat(30)}`)
                            setTimeout(()=>{
                                const info = tpalist.get(player2.getName())
                                if(info) {
                                    if(info.time == nowtime) {
                                        player1?.sendMessage(`§l§c당신의 tp 요청이 만료되었습니다.`)
                                        player2?.sendMessage(`§l§c${player1.getNameTag()}의 tp 요청이 만료되었습니다.`)
                                        tpalist.delete(player2.getName())
                                    }
                                }
                            },30000)
                        } else {
                            const info = tpalist.get(player2.getName())
                            const lefttime = Number(new Date()) - info.time;

                            const remainingtime = Math.floor(lefttime / 1000);
                            player1?.sendMessage(`§l§c당신은 이미 다른 플레이어한태 요청을 보냈습니다.\n§f( 만료까지 §e${30-remainingtime}§f초.. )`)
                        }


                    }
                }
            }

        },
        {
            players: [PlayerCommandSelector, true], // player-only
        },
    );


    command.register("tpaccept", "tp 요청을 수락합니다.!").overload(
        (param, origin) =>  {
            const player1 = origin.getEntity()
            if (player1?.isPlayer()) {
                const info = tpalist.get(player1.getName())
                if(info) {
                    player1?.runCommand(`tp "${info.target.getName()}" ${info.pos.x} ${info.pos.y} ${info.pos.z}`)
                    player1?.sendMessage(`§l§a성공적으로 수락되었습니다!`)
                    info.target?.sendMessage(`§l§a성공적으로 이동하였습니다.`)
                    tpalist.delete(player1.getName())
                } else {
                    player1.sendMessage(`§l§c당신에게 온 tp 요청이 없습니다!`)
                }
                
            }
        },
        {},
    );
        

})