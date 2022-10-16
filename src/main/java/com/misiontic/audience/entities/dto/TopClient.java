package com.misiontic.audience.entities.dto;

import com.misiontic.audience.entities.Client;

public class TopClient {

    private int total;
    private Client client;

    public TopClient(int total, Client client) {
        this.total = total;
        this.client = client;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
