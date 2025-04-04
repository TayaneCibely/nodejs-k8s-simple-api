## Tutorial: Deploy da Aplicação Node.js no Kubernetes com Kind

Este tutorial ensina como clonar, configurar e implantar uma aplicação Node.js no Kubernetes usando o **Kind** (Kubernetes in Docker).

---

### **Pré-requisitos** 😎
1. **Docker** instalado.
2. **Kind** instalado. Se precisar, siga a [documentação oficial do Kind](https://kind.sigs.k8s.io/docs/user/quick-start/).
3. **Git** instalado.

---

### **Passo 1: Clonar o Repositório** 👀
Clone o repositório da aplicação:
```bash
git clone https://github.com/TayaneCibely/nodejs-k8s-simple-api.git
cd nodejs-k8s-simple-api
```

---

### **Passo 2: Instalar Dependências** ✌
Instale as dependências do Node.js:
```bash
npm install
```

---

### **Passo 3: Rodar a Aplicação Localmente** (●'◡'●)
Inicie a aplicação localmente:
```bash
npm start
```

Acesse a aplicação no navegador ou via curl:
```
http://localhost:3000/hash/123
```

---

### **Passo 4: Criar a Imagem Docker** ❤🐱‍🐉
Construa a imagem Docker:
```bash
docker build -t node-hash .
```

Liste as imagens Docker criadas:
```bash
docker images
```

---

### **Passo 5: Executar a Imagem Docker Localmente**
Execute a imagem Docker localmente, mapeando a porta 3000:
```bash
docker run -p 3000:3000 node-hash
```

Acesse a aplicação novamente:
```
http://localhost:3000/hash/123
```

---

### **Passo 6: Parar o Container Docker**
Se precisar parar o container:
```bash
docker ps -a
docker stop <container_id>
```

---

### **Passo 7: Criar o Cluster Kubernetes com Kind**
Crie um cluster Kubernetes local usando o Kind:
```bash
kind create cluster
```

Verifique os nós do cluster:
```bash
kubectl get nodes
```

---

### **Passo 8: Carregar a Imagem Docker no Cluster**
Carregue a imagem Docker no cluster:
```bash
kind load docker-image node-hash
```

---

### **Passo 9: Aplicar o Manifesto Kubernetes**
Aplicar o manifesto Kubernetes para criar os recursos:
```bash
kubectl apply -f kubernetes/manifest.yaml
```

Verifique os deployments criados:
```bash
kubectl get deploy
```

---

### **Passo 10: Verificar Logs do Pod**
Verifique os logs do pod:
```bash
kubectl logs deploy/hash-api
```

---

### **Passo 11: Encaminhar a Porta do Serviço**
Mapear o serviço para a porta 8080:
```bash
kubectl port-forward service/hash-api 3000:80
```

Acesse a aplicação no navegador ou via curl:
```
http://localhost:3000/hash/123
```

---

### **Passo 12: Limpar Recursos**
Se precisar limpar os recursos criados:
```bash
kubectl delete -f kubernetes/manifest.yaml
```

---


### **Referências**
- [Kind Documentation](https://kind.sigs.k8s.io/)
- [Kubectl Documentation](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

---

### **Dicas Extras**
- Certifique-se de ter as variáveis de ambiente necessárias configuradas.
- Use o `kubectl describe` para depurar recursos Kubernetes.

---

Aqui está o conteúdo formatado para um arquivo `README.md`. Ele inclui todas as instruções de monitoramento e uso do script de sobrecarga, organizadas de forma clara e fácil de seguir.

---

# **Monitoramento e Teste de Sobrecarga no Kubernetes**

Este repositório contém instruções detalhadas para configurar o monitoramento da sua aplicação no Kubernetes usando Prometheus e Grafana, além de um script para testar a resiliência do sistema com sobrecargas simuladas.

---

## **1. Configuração do Monitoramento**

### **1.1. Pré-requisitos**
- **Docker**: Instalado e configurado.
- **Kind (Kubernetes IN Docker)**: Ferramenta para criar clusters Kubernetes locais.
- **Helm**: Gerenciador de pacotes para Kubernetes.
- **Git**: Para clonar o repositório.

### **1.2. Instalação do Prometheus e Grafana**

#### **1.2.1. Adicione os repositórios Helm**
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

#### **1.2.2. Instale o Prometheus**
```bash
helm install prometheus prometheus-community/prometheus
```

#### **1.2.3. Instale o Grafana**
```bash
helm install grafana grafana/grafana --namespace default
```

#### **1.2.4. Verifique os serviços instalados**
```bash
kubectl get services -n default
```

---

### **1.3. Acesso ao Prometheus**

1. **Encaminhe a porta do Prometheus**:
   ```bash
   kubectl port-forward service/prometheus-server 9090:80 -n default
   ```

2. **Acesse o Prometheus no navegador**:
   ```
   http://localhost:9090
   ```

3. **Explore as métricas**:
   - `up`: Verifica se os targets estão ativos.
   - `container_cpu_usage_seconds_total`: Uso de CPU dos contêineres.
   - `http_requests_total`: Total de requisições HTTP (se exposto pela aplicação).

---

### **1.4. Acesso ao Grafana**

1. **Obtenha a senha do Grafana**:
   Decodifique a senha do administrador usando o PowerShell:
   ```powershell
   $encodedPassword = kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}"
   [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($encodedPassword))
   ```

2. **Encaminhe a porta do Grafana**:
   ```bash
   kubectl port-forward service/grafana 3000:80 -n default
   ```

3. **Acesse o Grafana no navegador**:
   ```
   http://localhost:3000
   ```

4. **Faça login**:
   - Usuário: `admin`
   - Senha: A senha decodificada no passo anterior.

5. **Configure o Prometheus como fonte de dados**:
   - No menu lateral, clique em **Configuration > Data Sources**.
   - Clique em **Add data source** e selecione **Prometheus**.
   - Na URL, insira:
     ```
     http://prometheus-server.default.svc.cluster.local
     ```
   - Clique em **Save & Test**.

6. **Importe Dashboards Pré-configurados**:
   - Dashboard ID: `12006` (Kubernetes Monitoring)
   - Dashboard ID: `315` (Node Exporter Full)

---

### **1.5. Métricas Monitoradas**
Com o monitoramento configurado, você pode observar as seguintes métricas:
- **Uso de CPU e Memória**: Recursos consumidos pelos pods.
- **Latência das Requisições**: Tempo médio de resposta da aplicação.
- **Taxa de Erros**: Porcentagem de requisições falhas.
- **Escalabilidade**: Número de réplicas dos pods e ajustes automáticos.

---

## **2. Script de Sobrecarga**

### **2.1. Objetivo**
O script simula múltiplas requisições simultâneas à sua aplicação, permitindo que você teste a **resiliência** e o **desempenho** do sistema.

---

### **2.2. Estrutura do Script**

```javascript
const axios = require('axios');

const CONCURRENT_REQUESTS = 5; // Número de requisições simultâneas
const REQUESTS_TOTAL = 1000;    // Total de requisições que serão feitas
const TARGET_URL = 'http://localhost:3000/hash/123'; // Endpoint da aplicação

async function sendRequest(i) {
    try {
        const response = await axios.get(TARGET_URL);
        console.log(`[${i}] Status: ${response.status}`);
    } catch (error) {
        if (error.response) {
            console.log(`[${i}] Erro: ${error.response.status}`);
        } else {
            console.log(`[${i}] Erro: ${error.message}`);
        }
    }
}

async function run() {
    let promises = [];

    for (let i = 1; i <= REQUESTS_TOTAL; i++) {
        promises.push(sendRequest(i));

        if (promises.length >= CONCURRENT_REQUESTS) {
            await Promise.all(promises);
            promises = [];
        }
    }

    if (promises.length > 0) {
        await Promise.all(promises);
    }

    console.log('Finalizado!');
}

run();
```

---

### **2.3. Como Executar o Script**

1. **Instale as dependências**:
   Certifique-se de que a biblioteca `axios` está instalada:
   ```bash
   npm install axios
   ```

2. **Execute o script**:
   Execute o script no terminal:
   ```bash
   node overload.js
   ```

3. **Observe o comportamento do sistema**:
   Enquanto o script estiver rodando, monitore as métricas no Grafana para observar:
   - O aumento no uso de CPU e memória.
   - A latência das requisições.
   - Possíveis falhas ou reinicializações de pods.

---

### **2.4. Análise dos Resultados**

Após executar o script, analise os resultados no Grafana:
- **Escalabilidade**: Verifique se o Kubernetes escalou automaticamente o número de réplicas dos pods.
- **Resiliência**: Observe se algum pod foi reiniciado ou se houve falhas nas requisições.
- **Desempenho**: Avalie a latência média das requisições e o tempo de recuperação após a sobrecarga.

---

### **2.5. Sugestões para Melhorias**

- **Configurar Horizontal Pod Autoscaler (HPA)**:
  Configure o HPA para escalar automaticamente os pods com base no uso de CPU ou memória:
  ```bash
  kubectl autoscale deployment hash-api --cpu-percent=50 --min=2 --max=5
  ```

- **Ajustar Limites de Recursos**:
  Defina limites de CPU e memória nos manifestos Kubernetes para garantir que os pods não excedam os recursos disponíveis.

- **Testar Diferentes Cargas**:
  Altere os valores de `CONCURRENT_REQUESTS` e `REQUESTS_TOTAL` no script para simular diferentes níveis de carga.

---

## **3. Conclusão** 🚀

Com o monitoramento configurado e o script de sobrecarga, você tem uma poderosa combinação para testar e validar a resiliência e o desempenho da sua aplicação no Kubernetes.

--- 


##  🔗 Autores

- [Izabel Nascimento](https://github.com/izabelnascimento)

- [Leonardo Nunes](https://github.com/leonardonb)

- [Tayane Cibely](https://github.com/tayanecibely)
