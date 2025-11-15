import Image from "next/image";

import Header from "@/components/Layout/Header"
import Notification from "@/components/UI/Notification"
import LevelInfo from '@/components/UI/LevelInfo'
import IconButton from '@/components/UI/IconButton'
import Card from '@/components/UI/Card'
import Button from '@/components/UI/Button'

import fire from "@/public/fire.png"
import play from "@/public/play.png"

export default function Home() {
  return (
    <div className="w-full h-full">
      <Header name="Mo" rank="Expert Mixologyst" level={32}/>
      <Notification source={fire} text="You're on fire!! 8 day streak!" />
      <LevelInfo />
      <IconButton href="/challenge" icon={play} title="Daily Challange" description="Mix challanging cocktails" info="+100XP" />

    <div className="w-[90%] mx-auto flex gap-2">
      <Card>
      <Button>Challenge</Button>
      <Button style="outline">Practice</Button>
      </Card>
      <Card>
        <Button>Challenge</Button>
        <Button style="outline">Practice</Button>
        
      </Card>
    </div>
      
    </div>
  );
}
