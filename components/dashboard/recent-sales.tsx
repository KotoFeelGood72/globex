"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>ОК</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ООО "Компания"</p>
          <p className="text-sm text-muted-foreground">
            office@company.com
          </p>
        </div>
        <div className="ml-auto font-medium">+2,450₽</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>ИП</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ИП Иванов</p>
          <p className="text-sm text-muted-foreground">ivanov@mail.com</p>
        </div>
        <div className="ml-auto font-medium">+5,230₽</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>АО</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">АО "Бизнес"</p>
          <p className="text-sm text-muted-foreground">
            info@business.com
          </p>
        </div>
        <div className="ml-auto font-medium">+1,890₽</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>ОО</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ООО "Старт"</p>
          <p className="text-sm text-muted-foreground">
            contact@start.com
          </p>
        </div>
        <div className="ml-auto font-medium">+3,750₽</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>ЗА</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ЗАО "Прогресс"</p>
          <p className="text-sm text-muted-foreground">
            info@progress.com
          </p>
        </div>
        <div className="ml-auto font-medium">+8,250₽</div>
      </div>
    </div>
  );
}
