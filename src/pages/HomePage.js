import { Avatar, Button, CloseButton, Flex, HStack, Popover, Spinner, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { FaAngleDown, FaAngleRight, FaBell, FaEdit, FaFolderOpen, FaHome, FaMapPin, FaPlus, FaRegClipboard, FaRegEnvelope, FaSms, FaTrash, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillPushpin } from "react-icons/ai"
import ChannelHeader from "../components/ChannelHeader";
import CreateChannelModal from "../components/CreateChannelModal";
import Messages from "../components/Messages";
import { SocketContext } from "../context/SocketProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [channelId, setChannelId] = useState();
  const [messageId, setMessageId] = useState();
  const { channels, setChannels } = useContext(SocketContext)

  const channel = useMemo(
    () => {
      const channel = channels.find(channel => channel._id == channelId);
      if (!channel && channels.length > 0) {
        navigate(`/home?channel=${channels[0]._id}`)
      }
      return channel;
    },
    [channels, channelId]
  );

  const [nav, setNav] = useState("message")

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setChannelId(params.get('channel'));
    setMessageId(params.get('message'));
  }, [location]);

  return (
    <HStack flexGrow={1}>
      <Flex h={"calc(100vh - 40px)"} width={"full"} >
        {channel ? (
          <VStack flexGrow={1} align="stretch">
            <ChannelHeader
              borderBottom='1px solid #ccc'
              channel={channel}
            />
            <HStack paddingTop={"20px"} paddingInline={"20px"} gap={"6px"}>
              <HStack borderBottom={nav == "message" ? "2px solid grey" : ""} w={"100px"} gap={"4px"} cursor={"pointer"} padding={"6px"} onClick={() => setNav("message")}><FaSms size={"18px"} /><Text>Messages</Text></HStack>
              <HStack borderBottom={nav == "file" ? "2px solid grey" : ""} w={"100px"} gap={"4px"} cursor={"pointer"} padding={"6px"} onClick={() => setNav("file")}><FaFolderOpen size={"18px"} /><Text>Files</Text></HStack>
              <HStack borderBottom={nav == "pin" ? "2px solid grey" : ""} w={"100px"} gap={"px"} cursor={"pointer"} onClick={() => setNav("pin")} padding={"6px"}><AiFillPushpin size={"18px"} /><Text>Pins</Text></HStack>
            </HStack>
            {
              nav == "message" && <HStack flex='1 1 0'>
                <Messages
                  flexGrow={1}
                  h='full'
                  channelId={channelId}
                  messageId={null}
                />
                {messageId && (
                  <VStack w={{ base: '50%', lg: '35%' }} h='full' align='stretch' borderTop={"1px solid #ccc"} borderLeft='1px solid #ccc'>
                    <HStack px={4} justify='space-between'>
                      <Text>
                        Thread
                      </Text>
                      <CloseButton
                        onClick={() => navigate(`/home?channel=${channelId}`)}
                      />
                    </HStack>
                    <Messages
                      h='full'
                      channelId={channelId}
                      messageId={messageId}
                    />
                  </VStack>
                )}
              </HStack>}
          </VStack>
        ) : (
          <Flex flexGrow={1} h='full' direction='column' justify='center' align='center' gap={2}>
            <VStack>
              <Spinner />
              <Text fontSize="sm">
                Loading...
              </Text>
            </VStack>
          </Flex>
        )}
      </Flex>
    </HStack>
  );
};

export default HomePage;