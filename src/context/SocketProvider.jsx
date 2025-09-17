import { createContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { REQUEST, METHOD, STATUS } from "../constants/chat";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  useEffect(() => {
    if (token) {
      let temp = token;
      temp = temp.replace("Bearer ", "");
      setToken(temp)
    }
  }, [])

  const socket = useMemo(() => io(`${process.env.REACT_APP_BASE_URL}`, { extraHeaders: { token } }), [token]);
  const [channels, setChannels] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  socket.on('connect', () => {
    setIsConnected(true);
  });

  socket.on('disconnect', () => {
    setIsConnected(false);
  });

  useEffect(() => {
    socket.emit(REQUEST.AUTH, token);
  }, [socket]);

  const onCreateChannel = (status, data) => {
    if (status == STATUS.ON) {
      setChannels(prev => [...prev, data]);
    }
  }

  const onReadChannels = (status, data) => {
    if (status == STATUS.ON) {
      setChannels(data);
    }
  }

  const onUpdateChannel = (status, data) => {
    if (status == STATUS.ON) {
      setChannels((prev) => prev.map(channel => channel._id == data._id ? data : channel));
    }
  }

  const onDeleteChannel = (status, data) => {
    if (status == STATUS.ON) {
      setChannels((prev) => prev.filter(channel => channel._id != data.id));
    }
  }

  useEffect(() => {
    socket.emit(`${REQUEST.CHANNEL}_${METHOD.READ}`);
    socket.on(`${REQUEST.CHANNEL}_${METHOD.CREATE}`, onCreateChannel);
    socket.on(`${REQUEST.CHANNEL}_${METHOD.READ}`, onReadChannels);
    socket.on(`${REQUEST.CHANNEL}_${METHOD.UPDATE}`, onUpdateChannel);
    socket.on(`${REQUEST.CHANNEL}_${METHOD.DELETE}`, onDeleteChannel);
    return () => {
      socket.removeListener(`${REQUEST.CHANNEL}_${METHOD.CREATE}`, onCreateChannel);
      socket.removeListener(`${REQUEST.CHANNEL}_${METHOD.READ}`, onReadChannels);
      socket.removeListener(`${REQUEST.CHANNEL}_${METHOD.UPDATE}`, onUpdateChannel);
      socket.removeListener(`${REQUEST.CHANNEL}_${METHOD.DELETE}`, onDeleteChannel);
    }
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        channels,
        setChannels,
        isConnected,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
