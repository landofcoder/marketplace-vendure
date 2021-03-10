import {MigrationInterface, QueryRunner} from "typeorm";

export class orderstatus1615284436516 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product_review` CHANGE `response` `response` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `product_review` CHANGE `responseCreatedAt` `responseCreatedAt` datetime NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `channelId` `channelId` int NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `authorPhone` `authorPhone` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `authorIp` `authorIp` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `tags` `tags` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `adminUserId` `adminUserId` int NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `response` `response` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `error` `error` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `adminNote` `adminNote` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `responseCreatedAt` `responseCreatedAt` datetime NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `sentAt` `sentAt` datetime NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `deletedAt` `deletedAt` datetime NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `params` `params` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `vendorId` `vendorId` int NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter` CHANGE `templateContent` `templateContent` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter` CHANGE `templateCss` `templateCss` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter` CHANGE `params` `params` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `newsletter_text` `newsletter_text` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `newsletter_styles` `newsletter_styles` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `newsletter_params` `newsletter_params` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `queue_start_at` `queue_start_at` datetime NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `queue_finish_at` `queue_finish_at` datetime NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `subscriberToken` `subscriberToken` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `customerFirstName` `customerFirstName` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `customerLastName` `customerLastName` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `customerPhone` `customerPhone` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `gender` `gender` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `tags` `tags` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `params` `params` text NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue_link` CHANGE `letter_sent_at` `letter_sent_at` datetime NULL DEFAULT NULL", undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `newsletter_queue_link` CHANGE `letter_sent_at` `letter_sent_at` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `params` `params` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `tags` `tags` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `gender` `gender` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `customerPhone` `customerPhone` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `customerLastName` `customerLastName` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `customerFirstName` `customerFirstName` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `subscriber` CHANGE `subscriberToken` `subscriberToken` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `queue_finish_at` `queue_finish_at` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `queue_start_at` `queue_start_at` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `newsletter_params` `newsletter_params` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `newsletter_styles` `newsletter_styles` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter_queue` CHANGE `newsletter_text` `newsletter_text` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter` CHANGE `params` `params` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter` CHANGE `templateCss` `templateCss` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `newsletter` CHANGE `templateContent` `templateContent` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `vendorId` `vendorId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `params` `params` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `deletedAt` `deletedAt` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `sentAt` `sentAt` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `responseCreatedAt` `responseCreatedAt` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `adminNote` `adminNote` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `error` `error` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `response` `response` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `adminUserId` `adminUserId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `tags` `tags` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `authorIp` `authorIp` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `authorPhone` `authorPhone` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `contact` CHANGE `channelId` `channelId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `product_review` CHANGE `responseCreatedAt` `responseCreatedAt` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `product_review` CHANGE `response` `response` text NULL", undefined);
   }

}
