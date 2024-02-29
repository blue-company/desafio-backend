<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240222134418 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE medical_appointment (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, notes VARCHAR(500) NOT NULL, title_reason VARCHAR(180) NOT NULL, description_reason VARCHAR(500) NOT NULL, appointment_date DATETIME NOT NULL, UNIQUE INDEX UNIQ_6CC137F6F5199D25 (title_reason), UNIQUE INDEX UNIQ_6CC137F675A62784 (description_reason), INDEX IDX_6CC137F66B899279 (patient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, sex VARCHAR(20) NOT NULL, full_name VARCHAR(180) NOT NULL, birth_date DATETIME DEFAULT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649EFA269F7 (sex), UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE medical_appointment ADD CONSTRAINT FK_6CC137F66B899279 FOREIGN KEY (patient_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE medical_appointment DROP FOREIGN KEY FK_6CC137F66B899279');
        $this->addSql('DROP TABLE medical_appointment');
        $this->addSql('DROP TABLE user');
    }
}
