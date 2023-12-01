import {ChannelType} from "../types/channel.types.ts";

export function convertChannelToDanish({channel}: { channel: ChannelType }) {
    switch (channel) {
        case "COSMETIC":
            return "Kosmetik";
        case "HAIR_CARE":
            return "Hårpleje";
        default:
            return "Ukendt værdi"
    }

}