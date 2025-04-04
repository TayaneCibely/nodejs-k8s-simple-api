## Tutorial: Deploy da Aplicação Node.js no Kubernetes com Kind

Este tutorial ensina como clonar, configurar e implantar uma aplicação Node.js no Kubernetes usando o **Kind** (Kubernetes in Docker).

---

### **Pré-requisitos**
1. **Docker** instalado.
2. **Kind** instalado. Se precisar, siga a [documentação oficial do Kind](https://kind.sigs.k8s.io/docs/user/quick-start/).
3. **Git** instalado.

---

### **Passo 1: Clonar o Repositório**
Clone o repositório da aplicação:
```bash
git clone https://github.com/TayaneCibely/nodejs-k8s-simple-api.git
cd nodejs-k8s-simple-api
```

---

### **Passo 2: Instalar Dependências**
Instale as dependências do Node.js:
```bash
npm install
```

---

### **Passo 3: Rodar a Aplicação Localmente**
Inicie a aplicação localmente:
```bash
npm start
```

Acesse a aplicação no navegador ou via curl:
```
http://localhost:3000/hash/123
```

---

### **Passo 4: Criar a Imagem Docker**
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

##  🔗 Autores

- [Izabel Nascimento](https://github.com/izabelnascimento)

- [Leonardo Nunes](https://github.com/leonardonb)

- [Tayane Cibely](https://github.com/tayanecibely)
