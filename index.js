import { before } from "@revenge-mod/patcher";
import { findByProps } from "@revenge-mod/metro";

let unpatch;

export default {
    onLoad() {
        const ReplyActions = findByProps("createPendingReply");

        if (!ReplyActions?.createPendingReply) {
            console.log("[NoReplyPing] Reply module not found");
            return;
        }

        unpatch = before(
            ReplyActions,
            "createPendingReply",
            (args) => {
                args[2] ??= {};
                args[2].shouldMention = false;
            }
        );
    },

    onUnload() {
        unpatch?.();
    }
};
