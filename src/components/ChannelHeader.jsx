import { Avatar, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { METHOD, REQUEST } from "../constants/chat";
import { SocketContext } from "../context/SocketProvider";
import ChannelEditModal from "./ChannelEditModal";

const ChannelHeader = ({ channel, ...props }) => {
  const { socket } = useContext(SocketContext);
  const [showChannelEditModal, setShowChannelEditModal] = useState(false);
  const [show, setShow] = useState()
  const handleDeleteChannel = () => {
    socket.emit(`${REQUEST.CHANNEL}_${METHOD.DELETE}`, { id: channel._id });
  }

  return (
    <>
      <Flex p={4} justify='space-between' {...props}>
        <HStack>
          <Text>
            # {channel.name}
          </Text>
        </HStack>
        <Flex gap={2}>
          <Flex cursor={"pointer"}pos={"relative"} onMouseOver={() => { setShow(1) }} onMouseLeave={() => { setShow(0) }}>
            {/* {channel.members.filter((_, index) => index < 4).map(member => (
              <Box ml={-2} key={member._id} pos={"relative"}>
                <Avatar size="xs" onMouseOver={() => { setShow(1) }} onMouseLeave={() => { setShow(0) }} />
                <Text display={show ? "flex" : "none"} pos={"absolute"}>{member.username}</Text>
              </Box>
            ))} */}
            <Avatar size="xs"  />
            <VStack pos={"absolute"} right={"26px"} bg={"#ddd"} rounded={"6px"}>
              {channel.members.map((v, i) => {
                return <VStack paddingInline={"10px"} display={show ? "flex" : "none"} key={i}><Text>{v.username}</Text></VStack>
              })
              }
            </VStack>
          </Flex>
          {/* {channel.members.length > 4 && (
            <Text>
              +{channel.members.length - 4}
            </Text>
          )} */}
        </Flex>
      </Flex>
    </>
  )
}

export default ChannelHeader;
