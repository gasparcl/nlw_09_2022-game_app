import React, { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Entypo } from "@expo/vector-icons"

import { GameParams } from "../../@types/navigation"
import { Background } from "../../components/Background"
import { THEME } from "../../theme"
import logoImg from "../../assets/logo-nlw-esports.png"

import { styles } from "./styles"
import { Heading } from "../../components/Heading"
import { DuoCard, DuoCardProps } from "../../components/DuoCard"

interface RouteParams {
    id: string
    title: string
    bannerUrl: string
}

export function Game() {
    // ╦ ╦╔═╗╔═╗╦╔═╔═╗
    // ╠═╣║ ║║ ║╠╩╗╚═╗
    // ╩ ╩╚═╝╚═╝╩ ╩╚═╝
    const [duos, setDuos] = useState<DuoCardProps[]>([])
    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params as GameParams

    useEffect(() => {
        fetch(`http://192.168.0.112:3333/games/${game.id}/ads`)
            .then((response) => response.json())
            .then((data) => setDuos(data))
    }, [])

    // ╦ ╦╔═╗╔╗╔╔╦╗╦  ╔═╗╦═╗╔═╗
    // ╠═╣╠═╣║║║ ║║║  ║╣ ╠╦╝╚═╗
    // ╩ ╩╩ ╩╝╚╝═╩╝╩═╝╚═╝╩╚═╚═╝
    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image source={logoImg} style={styles.logo} />
                    <View style={styles.right} />{" "}
                    {/* Para centralizar a logo, criamos a view, ao lado, com uma estilização com largura e altura igual ao ícone de voltar do Entypo */}
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList
                    data={duos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => {}} />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[
                        duos.length > 0
                            ? styles.contentList
                            : styles.emptyListContent,
                    ]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Ainda não há anúncios publicados nesse jogo...
                        </Text>
                    )}
                />
            </SafeAreaView>
        </Background>
    )
}