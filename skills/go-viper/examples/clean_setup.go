package config

import (
	"errors"
	"fmt"
	"strings"

	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

type Config struct {
	Server   ServerConfig   `mapstructure:"server"`
	Database DatabaseConfig `mapstructure:"database"`
}

type ServerConfig struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

type DatabaseConfig struct {
	URL string `mapstructure:"url"`
}

func Load(fs *pflag.FlagSet) (Config, error) {
	v := viper.New()

	v.SetConfigName("config")
	v.SetConfigType("yaml")
	v.AddConfigPath(".")
	v.AddConfigPath("/etc/myapp")

	v.SetDefault("server.host", "127.0.0.1")
	v.SetDefault("server.port", 8080)

	v.SetEnvPrefix("MYAPP")
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
	v.AutomaticEnv()

	if err := v.BindEnv("database.url"); err != nil {
		return Config{}, fmt.Errorf("bind database.url env: %w", err)
	}

	if fs != nil {
		if err := BindNamedFlags(v, fs); err != nil {
			return Config{}, fmt.Errorf("bind flags: %w", err)
		}
	}

	if err := v.ReadInConfig(); err != nil {
		var notFound viper.ConfigFileNotFoundError
		if !errors.As(err, &notFound) {
			return Config{}, fmt.Errorf("read config: %w", err)
		}
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return Config{}, fmt.Errorf("unmarshal config: %w", err)
	}

	return cfg, nil
}

func AddFlags(fs *pflag.FlagSet) {
	fs.String("server-host", "127.0.0.1", "HTTP server host")
	fs.Int("server-port", 8080, "HTTP server port")
	fs.String("database-url", "", "Database connection URL")
}

func BindNamedFlags(v *viper.Viper, fs *pflag.FlagSet) error {
	if err := v.BindPFlag("server.host", fs.Lookup("server-host")); err != nil {
		return err
	}
	if err := v.BindPFlag("server.port", fs.Lookup("server-port")); err != nil {
		return err
	}
	if err := v.BindPFlag("database.url", fs.Lookup("database-url")); err != nil {
		return err
	}
	return nil
}
