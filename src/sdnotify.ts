import * as net from "net";

const SOCKADDR = process.env.NOTIFY_SOCKET;

/**
 * Send a notification to systemd, if the NOTIFY_SOCKET env var is set.
 *
 * @param state Notification to send
 */
export async function notify(state: string) {
    if (!SOCKADDR) {
        return;
    }

    let addr: string = SOCKADDR;
    if (addr[0] == "@") {
        addr = "\0" + addr.slice(1);
    }

    try {
        const sock = await net.connect(addr);
        sock.write(state);
    } catch (ex) {
        // we should only have NOTIFY_SOCKET if systemd expects to be notified...
    }
}
