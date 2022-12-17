import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import styles from './ShareBlock.module.scss';
import { useTranslation } from 'react-i18next';

const ShareBlock = () => {
  const shareUrl = window.location.href;
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.share_container}>
      <div className={styles.title}>
        <p>{t('share.share')}:</p>
      </div>
      <div className={styles.icons_container}>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={30} />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={30} />
        </TwitterShareButton>

        <ViberShareButton url={shareUrl}>
          <ViberIcon size={30} />
        </ViberShareButton>

        <TelegramShareButton url={shareUrl}>
          <TelegramIcon size={30} />
        </TelegramShareButton>

        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={30} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareBlock;
