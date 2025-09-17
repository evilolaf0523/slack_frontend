import { VStack, HStack, Text, Image, Avatar } from "@chakra-ui/react"
import { FaEnvelope, FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Statusbar from "../components/Statusbar"

const Sidebar = () => {
  const navigate = useNavigate()
  const [showState, setShowState] = useState()
  const logout = () => {
    localStorage.removeItem("token")
    navigate('/')
  }
  return (
    <VStack width={"60px"} h={"calc(100vh - 40px)"} bg={"#451245"} py={'26px'} justify={"space-between"}>
      <VStack gap={"20px"} >
        <VStack color="white" w="36px" h="36px" bgColor={"#703770ff"} rounded={"6px"} justify={"center"} alignItems={"center"} _hover={{ bg: "#111" }} cursor={"pointer"}>
          <Text>D</Text>
        </VStack>
        <VStack>
          <VStack color="white" w="36px" h="36px" bgColor={"#703770ff"} rounded={"6px"} justify={"center"} alignItems={"center"} _hover={{ bg: "#111" }} cursor={"pointer"}>
            <FaHome />
          </VStack>
          <Text color={"white"} fontSize={"12px"}>Home</Text>
        </VStack>
        <VStack>
          <VStack color="white" w="36px" h="36px" bgColor={"#703770ff"} rounded={"6px"} justify={"center"} alignItems={"center"} _hover={{ bg: "#111" }} cursor={"pointer"}>
            <FaEnvelope />
          </VStack>
          <Text color={"white"} fontSize={"12px"}>DMs</Text>
        </VStack>
      </VStack>
      <VStack cursor={"pointer"} pos={"relative"} onMouseOver={() => setShowState(1)} onMouseLeave={() => setShowState(0)}>
        <HStack pos={"relative"}>
          <Avatar size="sm" />
          <HStack pos={"absolute"} bottom={0} right={"0"}>
            <Statusbar status={1} />
          </HStack>
        </HStack>
        <VStack gap={"6px"} display={showState ? "flex" : "none"} color={"white"} pos={"absolute"} top={"-65px"} left={"100%"} padding={"5px"} w={"80px"} align={"center"} justify={"center"} outline={"1px solid grey"} >
          <HStack gap={"6px"}><Statusbar status={1} /><Text borderBottom={"1px solid"}>Online</Text></HStack>
          <HStack gap={"6px"}><Statusbar status={2} /><Text borderBottom={"1px solid"}>Offline</Text></HStack>
          <HStack gap={"6px"}  onClick={logout}><Statusbar status={0} /><Text borderBottom={"1px solid"}>Lot out</Text></HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Sidebar