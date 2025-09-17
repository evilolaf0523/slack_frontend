import { VStack, Input, HStack } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"

const Header = () => {
    return (
        <VStack w={"full"} height={"40px"} bg={"#451245"} align={"center"} justify={"center"}>
            <HStack width={"460px"} pos={"relative"}>
                <HStack pos={"absolute"} left={"10px"}><FaSearch color="white" /></HStack>
                <Input placeholder="Search..." type="text" height={'95%'} textColor={"white"} padding={"4px"} paddingInline={"32px"} />
            </HStack>
        </VStack>
    )
}

export default Header