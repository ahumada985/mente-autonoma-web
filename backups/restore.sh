#!/bin/bash
# Script de Restauración de Backup
# Generado automáticamente el 2025-09-03T17:30:20.069Z

BACKUP_NAME="backup-2025-09-03T17-30-19-760Z"
BACKUP_DIR="C:\Users\usuario\Desktop\Proyectos_IA\Cursor_oficial\backups"
SOURCE_DIR="C:\Users\usuario\Desktop\Proyectos_IA\Cursor_oficial"

echo "🔄 Iniciando restauración desde backup: $BACKUP_NAME"

if [ ! -f "$BACKUP_DIR/$BACKUP_NAME.tar.gz" ]; then
    echo "❌ Backup no encontrado: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
    exit 1
fi

echo "📦 Extrayendo backup..."
tar -xzf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" -C "$SOURCE_DIR"

echo "✅ Restauración completada exitosamente!"
echo "📁 Archivos restaurados en: $SOURCE_DIR"
