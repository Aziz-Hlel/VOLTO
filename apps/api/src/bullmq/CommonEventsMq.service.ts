import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonEventsMqService {
  getNotifcationHeadings({
    delay,
    eventName,
  }: {
    delay: 'firstDelay' | 'secondDelay';
    eventName: string;
  }) {
    return {
      en: delay === 'firstDelay' ? `🎉 ${eventName} ` : `🎊 ${eventName}`,

      fr: delay === 'firstDelay' ? `🎉 ${eventName} ` : `🎊 ${eventName}`,

      es: delay === 'firstDelay' ? `🎉 ${eventName} ` : `🎊 ${eventName}`,

      ar: delay === 'firstDelay' ? `🎉 ${eventName} ` : `🎊 ${eventName}`,
    };
  }

  getNotificationContent({ delay }: { delay: 'firstDelay' | 'secondDelay' }) {
    return {
      en:
        delay === 'firstDelay'
          ? `Reserve your spot and don’t miss the fun! 🥂`
          : `Almost time — grab your friends and head over! 🔥 1 hour to go!`,
      fr:
        delay === 'firstDelay'
          ? `Réservez votre place et ne manquez pas la soirée ! 🥂`
          : `Presque l'heure — prenez vos amis et rejoignez-nous ! 🔥 1 heure restante !`,
      es:
        delay === 'firstDelay'
          ? `¡Reserva tu lugar y no te pierdas la diversión! 🥂`
          : `Casi es hora — ¡reúne a tus amigos y ven! 🔥 ¡1 hora restante!`,
      ar:
        delay === 'firstDelay'
          ? `احجز مكانك ولا تفوت المرح! 🥂`
          : `اقترب الوقت — اجمع أصدقائك وتوجهوا! 🔥 تبقى ساعة واحدة!`,
    };
  }
}
