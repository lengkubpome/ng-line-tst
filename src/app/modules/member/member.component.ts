import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';
import { MemberService } from '@shared/services/member.service';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  liffId = '1656123917-QNVE8A01';
  os: ReturnType<typeof liff.getOS>;
  // profile: UnPromise<ReturnType<typeof liff.getProfile>>;
  profile: any;

  displayName = '';
  userId = '';
  pictureURL = '';

  member: any;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    liff.init({ liffId: this.liffId });

    liff.ready // .init({ liffId: this.liffId })
      .then(() => {
        this.os = liff.getOS();

        if (liff.isInClient()) {
          liff
            .getProfile()
            .then((profile: any) => {
              this.displayName = profile.displayName;
              this.userId = profile.userId;
              this.pictureURL = profile.pictureUrl;
            })
            .catch(console.error);
        }

        // if (liff.isLoggedIn()) {
        //   liff
        //     .getProfile()
        //     .then((profile: any) => {
        //       this.displayName = profile.displayName;
        //       this.userId = profile.userId;
        //       this.pictureURL = profile.pictureUrl;
        //     })
        //     .catch(console.error);
        // } else {
        //   liff.login();
        // }
      })
      .catch(console.error);
  }

  onClick(): void {
    this.memberService.getMemberById('1').subscribe((data) => {
      let result = JSON.stringify(data);
      result = JSON.parse(result);
      this.member = result[0];
    });
  }

  async sendMessageLine() {
    await liff
      .sendMessages([flexMsg] as any)
      .then(() => {
        console.log('message sent');
        liff.closeWindow();
      })
      .catch((err: Error) => {
        console.log('error', err);
        // liff.closeWindow();
      });
  }
}

const flexMsg: any = {
  type: 'flex',
  altText: 'Flex Messages',
  contents: {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        uri: 'http://linecorp.com/',
      },
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          size: 'xl',
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'button',
          style: 'link',
          height: 'sm',
          action: {
            type: 'uri',
            label: 'SHARE',
            uri: 'https://www.google.com',
          },
        },
        {
          type: 'spacer',
          size: 'sm',
        },
      ],
      flex: 0,
    },
  },
};
