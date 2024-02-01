"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const event_1 = require("bdsx/event");
event_1.events.serverOpen.on(() => {
    const tpalist = new Map;
    command_2.command.register("tpa", "tp 요청을 보냅니다!").overload((param, origin) => {
        if (param.players) {
            for (const player2 of param.players.newResults(origin)) {
                const player1 = origin.getEntity();
                if (player1 === null || player1 === void 0 ? void 0 : player1.isPlayer()) {
                    if (!tpalist.get(player2.getName())) {
                        const nowtime = new Date();
                        tpalist.set(player2.getName(), {
                            pos: player2.getFeetPos(),
                            time: nowtime,
                            target: player1,
                        });
                        player1.sendMessage(`§l§e${"=".repeat(40)}\n§f${player1.getNameTag()}님에게 tp요청을 보냈습니다. 30초뒤에 다시 보낼수 있습니다.\n§e${"=".repeat(40)}`);
                        player2.sendMessage(`§l§e${"=".repeat(40)}\n§f${player1.getNameTag()}님이 지금 위치로 tp요청을 보냈습니다.\n§e'/tpaccept'§f로 수락할수 있습니다\n§e${"=".repeat(40)}`);
                        setTimeout(() => {
                            const info = tpalist.get(player2.getName());
                            if (info) {
                                if (info.time == nowtime) {
                                    player1.sendMessage(`§l§c당신의 tp 요청이 만료되었습니다.`);
                                    player2.sendMessage(`§l§c${player1.getNameTag()}의 tp 요청이 만료되었습니다.`);
                                    tpalist.delete(player2.getName());
                                }
                            }
                        }, 30000);
                    }
                    else {
                        const info = tpalist.get(player2.getName());
                        const lefttime = Number(new Date()) - info.time;
                        const remainingtime = Math.floor(lefttime / 1000);
                        player1.sendMessage(`§l§c당신은 이미 다른 플레이어한태 요청을 보냈습니다.\n§f( 만료까지 §e${30 - remainingtime}§f초.. )`);
                    }
                }
            }
        }
    }, {
        players: [command_1.PlayerCommandSelector, true], // player-only
    });
    command_2.command.register("tpaccept", "tp 요청을 수락합니다.!").overload((param, origin) => {
        const player1 = origin.getEntity();
        if (player1 === null || player1 === void 0 ? void 0 : player1.isPlayer()) {
            const info = tpalist.get(player1.getName());
            if (info) {
                player1.runCommand(`tp "${info.target.getName()}" ${info.pos.x} ${info.pos.y} ${info.pos.z}`);
                player1.sendMessage(`§l§a성공적으로 수락되었습니다!`);
                info.target.sendMessage(`§l§a성공적으로 이동하였습니다.`);
                tpalist.delete(player1.getName());
            }
            else {
                player1.sendMessage(`§l§c당신에게 온 tp 요청이 없습니다!`);
            }
        }
    }, {});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUErRTtBQUMvRSwwQ0FBdUM7QUFDdkMsc0NBQW9DO0FBRXBDLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUV0QixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQWdCLENBQUM7SUFHckMsaUJBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FDNUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDZixLQUFLLE1BQU0sT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNwRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7Z0JBQ2xDLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsRUFBRSxFQUFFO29CQUNyQixJQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTt3QkFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTt3QkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQzNCLEdBQUcsRUFBRyxPQUFPLENBQUMsVUFBVSxFQUFFOzRCQUMxQixJQUFJLEVBQUcsT0FBTzs0QkFDZCxNQUFNLEVBQUcsT0FBTzt5QkFDbkIsQ0FBQyxDQUFBO3dCQUNGLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUUsMENBQTBDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUs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