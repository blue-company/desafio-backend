<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240223123931 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE medical_appointment ADD appointment_token VARCHAR(20) DEFAULT NULL, ADD is_token_used TINYINT(1) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6CC137F6B34790D5 ON medical_appointment (appointment_token)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_6CC137F6B34790D5 ON medical_appointment');
        $this->addSql('ALTER TABLE medical_appointment DROP appointment_token, DROP is_token_used');
    }
}
